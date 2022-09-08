import React from "react";
import { useState } from "react";
import styles from "../../styles/hamstercard.module.css"
import { HamsterModel } from "../../models/HamsterModel";
import allHamsters from "../../atoms/allHamsters";
import { makeImg } from "../../utils";

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
            <img className={styles.hamsterPic} src={`/HamsterPictures/${hamster.imgName}`} alt="Bild på hamster" />
          )}
          {hamster.name}
          <p>
            {hamster.name} loves {hamster.loves} and eating {hamster.favFood}
          </p>
          <button onClick={() => HamsterCard}>
            Remove Hamster
          </button>
        </div>
    </div>
  );
};
export default HamsterCard;
function useRecoilState<T>(allHamsters: any): [any, any] {
	throw new Error("Function not implemented.");
}

