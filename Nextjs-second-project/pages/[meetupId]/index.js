import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";
import { Fragment } from "react";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="decsription" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const uri =
    "mongodb+srv://stonks159:rgRQ1ScKb1a5Kodi@firstmongodb.aas5yex.mongodb.net/?retryWrites=true&w=majority";

  const client = await MongoClient.connect(uri);

  const collection = client.db("meetup").collection("meetups");

  const meetups = await collection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const uri =
    "mongodb+srv://stonks159:rgRQ1ScKb1a5Kodi@firstmongodb.aas5yex.mongodb.net/?retryWrites=true&w=majority";

  const client = await MongoClient.connect(uri);

  const collection = client.db("meetup").collection("meetups");

  const selectedMeetup = await collection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
