import React from "react";
import { useRecoilState } from 'recoil';
import styles from "../../styles/hamstercard.module.css"
import { HamsterModel } from "../../models/HamsterModel";
import allHamsters from "../../atoms/allHamsters";
import { makeImg } from "../../utils";

interface Props {
  hamster: HamsterModel;
}
// Remove the Hamster


const HamsterCard =({hamster }: Props) => {
const [, setData] = useRecoilState<HamsterModel[]>(allHamsters);

	const hamsterCard = async () => {
const response: Response = await fetch(makeImg(`/hamsters/${hamster.id}`), {
	method: 'DELETE',
	headers: {
	  'Content-Type': 'application/json'
	},
	body: null
  })
  if (response.status === 200) {


	async function getData() {
	  const response: Response = await fetch(makeImg('/hamsters/'))
	  const apiData: any = await response.json()

	  setData(apiData as HamsterModel[])
	}
	getData()
  }

}
  return (
    <div className={styles.wrapperGallery}>
        <div className={styles.hamsterInfo}>
          {hamster.imgName && (
            <img className={styles.hamsterPic} src={`/HamsterPictures/${hamster.imgName}`} alt="Bild på hamster" />
          )}
        <h3>Name: {hamster.name}</h3> is <p> Age: {hamster.age} old.<br />
				{hamster.name} Loves: {hamster.loves}<br />
				Favorite Food: {hamster.favFood} <br />
				Matches: {hamster.games}</p>
				Wins: {hamster.wins}<br />
				Defeats: {hamster.defeats}<br />
          <button className={styles.delete} onClick={() => hamsterCard()}>
            Remove Hamster
          </button>
        </div>
    </div>
  );
};
export default HamsterCard;
