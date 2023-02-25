import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

type MonsterRequestData = {
  "description": string,
	"location": string,
	"level": number,
	"numberPlayers": number
}

type MonsterData = {}

const Index = () => {
  const [monsterData, setMonsterData] = useState();

  const getMonsterData = (monsterRequestData:MonsterRequestData):void => {
    fetch("http://127.0.0.1:5000/monster", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: "no-cors",
      method: "POST",
      body: JSON.stringify(monsterRequestData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

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