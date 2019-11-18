import React from "react";
import { AudioPlayer } from "./components";
import { stringToSeconds } from "./mixins/TimeFormatterMixin";

function App() {
  return (
    <div>
      <AudioPlayer
        audioItems={[
          {
            src:
              "https://thebkp-podcasts.s3.amazonaws.com/joyce-dave-bill-allinfra-v1.mp3",
            name: "main source"
          }
        ]}
      />
      <AudioPlayer
        audioItems={[
          {
            src:
              "https://thebkp-podcasts.s3.amazonaws.com/joyce-dave-bill-allinfra-v1.mp3",
            name: "What is your background and path to a blockchain career?",
            start: stringToSeconds("1:18"),
            end: stringToSeconds("2:38")
          },
          {
            src:
              "https://thebkp-podcasts.s3.amazonaws.com/joyce-dave-bill-allinfra-v1.mp3",
            name:
              "Different types of traditional financing that could be improved by blockchain.",
            start: stringToSeconds("2:45"),
            end: stringToSeconds("3:33")
          }
        ]}
      />
    </div>
  );
}

export default App;
