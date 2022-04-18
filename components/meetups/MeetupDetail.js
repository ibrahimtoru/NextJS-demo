import classes from "./MeetupDetail.module.css";
import { Fragment } from "react";

export default function MeetupDetail(props) {
  return (
    <Fragment>
      <section className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </Fragment>
  );
}
