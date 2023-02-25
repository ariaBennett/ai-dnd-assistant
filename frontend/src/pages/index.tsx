import { Button, Col, Grid, Input, Row } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import styled from 'styled-components';

const InputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  >div {
    width: 100%;

  }
`;

const MonsterStatBlock = styled.div`
  background: url(./img/stat-block-top-texture.png),url(./img/paper-texture.png);
  background-size: 100% auto;
  background-position: top center;
  background-repeat: no-repeat,repeat;

  &:before,
  &:after {
    content: "";
    display: block;
    background: url(./img/stat-bar-book.png) center;
    background-size: 100% 100%;
    height: 6px;
    position: absolute;
    left: 0;
    right: 0;
  }
`;

const MonsterStatHeader = styled.div`
  padding: 10px 0;
  h1,
  h2 {
    margin: 8px 0;
  }
`;

const MonsterStatSection = styled.div`
  >div {
    margin: 8px 0;
  }
  &:after {
    content: "";
    display: block;
    background: url(./img/stat-block-header-bar.svg) center;
    height: 10px;
    background-size: 90% auto;
    background-position: top left;
    background-repeat: no-repeat,repeat;
  }
`;

const MonsterStatActionsTitle = styled.div`
  font-size: 24px;
  color: #822000;
  border-bottom: 1px solid #822000;
  padding-bottom: 6px;
`;

type MonsterRequestData = {
  "description": string,
	"location": string,
	"level": number,
	"numberPlayers": number
}

type MonsterData = {}

const presetMonsterData = {
  "identity": {
    "personalName": "Ignatius",
    "creatureName": "Magma Colossus",
    "size": "Huge",
    "species": "Elemental",
    "alignment": "Neutral"
  },
  "attributes": {
    "armorClass": 18,
    "armorClassType": "Natural Armor",
    "maxHitPoints": 250,
    "hitPointsDice": "20d12 + 100",
    "speed": "40 ft., climb 40 ft."
  },
  "statBlock": {
    "STR": 28,
    "DEX": 8,
    "CON": 20,
    "INT": 4,
    "WIS": 10,
    "CHA": 6
  },
  "details": {
    "resistances": {
      "damageResistances":
        "Bludgeoning, Piercing, and Slashing from Nonmagical Attacks",
      
      "conditionResistances":
        "",
      
      "damageImmunities":
        "Fire",
      
      "conditionImmunities":
        "Charmed, Exhaustion, Frightened, Paralyzed, Petrified, Poisoned"
      
    },
    "skills": "",
    "senses": [
      {
        "senseTitle": "Darkvision",
        "senseValue": "120 ft."
      },
      {
        "senseTitle": "Passive Perception",
        "senseValue": "10"
      }
    ],
    "languages": [
      "Primordial"
    ],
    "challenge": "15",
    "proficiencyBonus": "+5"
  },
  "passiveTraits": [
    {
      "name": "Fire Absorption",
      "description": "Whenever Ignatius is subjected to fire damage, it takes no damage and instead regains a number of hit points equal to the fire damage dealt."
    },
    {
      "name": "Magma Form",
      "description": "Ignatius can move through a space as narrow as 1 inch wide without squeezing. A creature that touches Ignatius or hits it with a melee attack while within 5 feet of it takes 7 (2d6) fire damage."
    }
  ],
  "actions": [
    {
      "name": "Multiattack",
      "description": "Ignatius makes two slam attacks."
    },
    {
      "name": "Slam",
      "description": "Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 26 (4d8 + 8) bludgeoning damage plus 7 (2d6) fire damage."
    },
    {
      "name": "Magma Blast (1/day)",
      "description": "Ignatius unleashes a blast of molten lava in a 60-foot cone. Each creature in that area must make a DC 18 Dexterity saving throw, taking 44 (8d10) fire damage on a failed save, or half as much damage on a successful one."
    }
  ]
};

const presetMonsterImage = "https://openailabsprodscus.blob.core.windows.net/private/user-KVTlsWh64b9mMTVu9WuHYfvk/generations/generation-6FjJDdbmCzS77KxSyFEW36IU/image.webp?st=2023-02-25T15%3A49%3A19Z&se=2023-02-25T17%3A47%3A19Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-02-25T13%3A42%3A23Z&ske=2023-03-04T13%3A42%3A23Z&sks=b&skv=2021-08-06&sig=QAAFiAC4XvzWMelmoufBx87a7Ow3cGqth%2B6IEOy37y0%3D";

const emptyOrStringArray = (array: Array<string>): boolean => !!array.length && !!array[0];

const titleDescriptionBlock = (title: string, description: string) => title && description && <div><strong>{title}</strong> {description}</div>;

const Index = () => {
  const [monsterData, setMonsterData] = useState();
  const [monsterImage, setMonsterImage] = useState();

  const getMonsterData = (monsterRequestData: MonsterRequestData) => {
    axios.post('http://127.0.0.1:5000/monster', monsterRequestData).then(resp => {
      console.log(resp.data)
      setMonsterData(presetMonsterData);
      setMonsterImage(presetMonsterImage);
    }).catch((error) => {
      console.log(error)
      setMonsterData(presetMonsterData);
      setMonsterImage(presetMonsterImage);
    })
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
      <InputArea>
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
          Generate Monster
      </Button>
      </InputArea>
      
      { monsterImage && <Image
        src={monsterImage}
        alt="Default Image"
        objectFit="cover"
      /> }

        { monsterData && 
      <MonsterStatBlock>
        <MonsterStatHeader>
          <div><h1>{monsterData.identity.personalName}</h1><h2>({monsterData.identity.creatureName})</h2></div>
          <div><i>{monsterData.identity.size} {monsterData.identity.species}, {monsterData.identity.alignment}</i></div>
        </MonsterStatHeader>
        <MonsterStatSection>
          {titleDescriptionBlock("Armor Class", `${monsterData.attributes.armorClass} (${monsterData.attributes.armorClassType})`)}
          {titleDescriptionBlock("Hit Points", `${monsterData.attributes.maxHitPoints} (${monsterData.attributes.hitPointsDice})`)}
          {titleDescriptionBlock("Speed", monsterData.attributes.speed)}
        </MonsterStatSection>
        <MonsterStatSection>
          <Grid.Container gap={3}>
            <Grid xs={4}>
              <Col>
              <Row justify="center">STR</Row>
              <Row justify="center">{monsterData.statBlock.STR}</Row>
              </Col>
            </Grid>
            <Grid xs={4}>
              <Col>
              <Row justify="center">DEX</Row>
              <Row justify="center">{monsterData.statBlock.DEX}</Row>
              </Col>
            </Grid>
            <Grid xs={4}>
              <Col>
              <Row justify="center">CON</Row>
              <Row justify="center">{monsterData.statBlock.CON}</Row>
              </Col>
            </Grid>
            <Grid xs={4}>              
              <Col>
                <Row justify="center">INT</Row>
                <Row justify="center">{monsterData.statBlock.INT}</Row>
              </Col>
            </Grid>
            <Grid xs={4}>
              <Col>
              <Row justify="center">WIS</Row>
              <Row justify="center">{monsterData.statBlock.WIS}</Row>
              </Col>
            </Grid>
            <Grid xs={4}>
              <Col>
              <Row justify="center">CHA</Row>
              <Row justify="center">{monsterData.statBlock.CHA}</Row>
              </Col>
            </Grid>
          </Grid.Container>
        </MonsterStatSection>
        <MonsterStatSection>
          {titleDescriptionBlock("Condition Resistances",monsterData.details.resistances.conditionResistances)}
          {titleDescriptionBlock("Damage Resistances",monsterData.details.resistances.damageResistances)}
          {titleDescriptionBlock("Condition Immunities",monsterData.details.resistances.conditionImmunities)}
          {titleDescriptionBlock("Damage Immunities",monsterData.details.resistances.damageImmunities)}
          {titleDescriptionBlock("Skills",monsterData.details.skills)}
          {monsterData.details.senses.map(sense => (titleDescriptionBlock(sense.senseTitle, sense.senseValue)))}
          {titleDescriptionBlock("Languages", monsterData.details.languages.join(', '))}
          {titleDescriptionBlock("Challenge", monsterData.details.challenge)}
          {titleDescriptionBlock("Proficiency Bonus", monsterData.details.proficiencyBonus)}
        </MonsterStatSection>
        <MonsterStatSection>
          {monsterData.passiveTraits.map(passiveTrait => titleDescriptionBlock(passiveTrait.name,passiveTrait.description))}
          <MonsterStatActionsTitle>Actions</MonsterStatActionsTitle>
          {monsterData.actions.map(action => titleDescriptionBlock(action.name,action.description))}
        </MonsterStatSection>
      </MonsterStatBlock>
}
    </>
  );
}

export default Index;