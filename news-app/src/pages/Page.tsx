import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonFooter,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import React from 'react';
import './Page.css';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import { RefresherEventDetail } from '@ionic/core';

const API_KEY = '104e1e62108f4adb8f9991d5f0da0cca';
const endpoint = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const sendGetRequest = async () => {
  
  const response = await axios({
    url: endpoint,
    method: 'get'
  });
  console.log(response);
  return response.data;
};

const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
  console.log('Begin async operation');
  setTimeout(() => {
    console.log('Async operation has ended');
    sendGetRequest();
    event.detail.complete();
  }, 2000);
};

const Page: React.FC<RouteComponentProps<{ name: string; }>> = ({ match }) => {

  const [items, setItems] = React.useState([]);
  
  React.useEffect(() => {
    sendGetRequest().then(data => setItems(data.articles));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{match.params.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{ match.params.name }</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
          {items.map((item, index) => {
            return(
              <IonCard key={index}>
                 <img alt="ArticleImage" src={item['urlToImage']}/>
              <IonCardHeader>
                <IonCardTitle> {item['title']} </IonCardTitle>
                <IonCardSubtitle> By: {item['author']} </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
            <IonButton href={item['url']} color="primary" slot="end"> Read Article </IonButton>
              </IonCardContent>
            </IonCard>
            )
          })}

        <IonFooter>
          Powered by <a target="_blank" rel="noopener noreferrer" href="https://newsapi.org">newsapi.org</a>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Page;
