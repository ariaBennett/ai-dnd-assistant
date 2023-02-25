import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

type MonsterRequestData = {
  "description": string,
	"location": string,
	"level": number,
	"numberPlayers": number
}

type MonsterData = {}

const Index = () => {
  const [monsterData, setMonsterData] = useState();

  const getMonsterData = (monsterRequestData: MonsterRequestData) => {
    axios.post('http://127.0.0.1:5000/monster').then(resp => {
      console.log(resp.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  // const getMonsterData = (monsterRequestData:MonsterRequestData):void => {
  //   fetch("http://127.0.0.1:5000/monster", {
  //     headers: new Headers({'content-type': 'application/json', 'Access-Control-Allow-Origin': "*"}),
  //     mode: "cors",
  //     method: "POST",
  //     body: JSON.stringify(monsterRequestData),
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("Success:", result);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }

  const generateMonsterData = () => {
    getMonsterData({
      "description": "cyclops monster",
      "location": "volcano",
      "level": 1,
      "numberPlayers": 1
    });
  }

  return (
    <>
      <div>
        <Input 
          underlined 
          labelLeft="description" 
          placeholder="cyclops monster" 
        />
      <div>
      </div>
        <Input 
          underlined 
          labelLeft="location" 
          placeholder="volcano" 
        />
      <div>
      </div>
        <Input 
          underlined 
          labelLeft="username" 
          placeholder="1" 
          type="number" 
        />
      </div>
      <div>
        <Input 
          underlined 
          labelLeft="number of players" 
          placeholder="1" 
          type="number" 
        />
      </div>

      <Button color="primary" auto ghost onClick={generateMonsterData}>
          Primary
      </Button>
    </>
  );
}

export default Index;