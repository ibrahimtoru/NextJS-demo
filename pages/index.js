import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups in Toru</title>
        <meta name="description" content="Browse react meetups in Toru" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an api
  const client = await MongoClient.connect(
    "mongodb+srv://wadanKhan:toruKhan@cluster0.6xnmz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  // always need to return an object
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 60,
  };
}

// // for the page to be regenerated at every request use getServerSideProps
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // can fetch data here
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
