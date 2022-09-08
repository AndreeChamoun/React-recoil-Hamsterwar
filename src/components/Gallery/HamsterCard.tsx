import React from "react";
import { useRecoilState } from 'recoil';
import styles from "../../styles/hamstercard.module.css"
import { HamsterModel } from "../../models/HamsterModel";
import { makeImg, picImport } from "../../utils";
import allHamsters from "../../atoms/allHamsters";

interface Props {
  hamster: HamsterModel;
}
// Remove the Hamster
const HamsterCard = ({ hamster }: Props) => {
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
            <img className={styles.hamsterPic} src={picImport(hamster.imgName)} alt="Bild på hamster" />
          )}
          {hamster.name}
		  		<h3>Name: {hamster.name}</h3> 
				<p> Age: {hamster.age}<br />
				Loves: {hamster.loves}<br />
				Favorite Food: {hamster.favFood} <br />
				Wins: {hamster.wins}<br />
				Defeats: {hamster.defeats}<br />
				Matches: {hamster.games}</p>

				<button className={styles.delete} onClick={() => hamsterCard}>Delete Hamster</button>
        </div>
    </div>
  );
};
export default HamsterCard;
