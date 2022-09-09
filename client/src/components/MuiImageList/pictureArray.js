import bts1 from "../../assets/images/photos/bts-1.jpg";
import bts2 from "../../assets/images/photos/bts-2.jpg";
import copy2 from "../../assets/images/photos/copy-2.jpg";
import danSamJoe from "../../assets/images/photos/dan-sam-joe.jpg";
import danielLibby from "../../assets/images/photos/daniel-libby.jpg";
import erinBrown from "../../assets/images/photos/erin-brown.jpg";
import bts3 from "../../assets/images/photos/bts-3.jpg";
import franken1 from "../../assets/images/photos/franken-1.jpg";
import franken2 from "../../assets/images/photos/franken-2.jpg";
import franken3 from "../../assets/images/photos/franken-3.png";
import franken5 from "../../assets/images/photos/franken-5.jpg";
import franken6 from "../../assets/images/photos/franken-6.jpg";
import mother1 from "../../assets/images/photos/mother-1.jpg";
import mother2 from "../../assets/images/photos/mother-2.jpg";
import mother3 from "../../assets/images/photos/mother-3.jpg";
import productions from "../../assets/images/photos/productions-crew.jpg";
import motherPoster from "../../assets/images/photos/mother-poster.jpg";
import roomPoster from "../../assets/images/photos/room-poster.jpg";
import frankenPoster from "../../assets/images/photos/franken-poster.jpg";
import richard from "../../assets/images/photos/richard.jpg";
import { v4 as uuidv4 } from "uuid";

const projectArray = [
  { id: uuidv4(), photo: motherPoster, label: "mother noose poster" },
  { id: uuidv4(), photo: roomPoster, label: "room for rent poster" },
  { id: uuidv4(), photo: frankenPoster, label: "frankenthug poster" },
];

const pictureArray = [
  { id: uuidv4(), photo: mother1, label: "image0" },
  { id: uuidv4(), photo: bts1, label: "image1" },
  { id: uuidv4(), photo: bts2, label: "image2" },
  { id: uuidv4(), photo: copy2, label: "image3" },
  { id: uuidv4(), photo: mother2, label: "image4" },
  { id: uuidv4(), photo: danielLibby, label: "image5" },
  { id: uuidv4(), photo: erinBrown, label: "image6" },
  { id: uuidv4(), photo: bts3, label: "image7" },
  { id: uuidv4(), photo: franken1, label: "image8" },
  { id: uuidv4(), photo: franken2, label: "image9" },
  { id: uuidv4(), photo: franken3, label: "image10" },
  { id: uuidv4(), photo: franken5, label: "image11" },
  { id: uuidv4(), photo: mother3, label: "image12" },
  { id: uuidv4(), photo: danSamJoe, label: "image13" },
  { id: uuidv4(), photo: franken6, label: "image14" },
  { id: uuidv4(), photo: productions, label: "image15" },
];

export { pictureArray, projectArray };
