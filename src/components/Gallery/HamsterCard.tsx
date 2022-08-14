import React from "react";
import { useState } from "react";
import styles from "../../styles/hamstercard.module.css"
import { HamsterModel } from "../../models/HamsterModel";

interface Props {
  hamster: HamsterModel;
}
// Remove the Hamster

const HamsterCard = ({ hamster }: Props) => {
  async function deleteAHamster(id: string) {
    await fetch(`/hamsters/${id}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <div className={styles.wrapperGallery}>
        <div className={styles.hamsterInfo}>
          {hamster.imgName && (
            <img className={styles.hamsterPic} src={`/img/${hamster.imgName}`} alt="Bild på hamster" />
          )}
          {hamster.name}
          <p>
            {hamster.name} loves {hamster.loves} and eating {hamster.favFood}
          </p>
          <button onClick={() => deleteAHamster(hamster.id)}>
            Remove Hamster
          </button>
        </div>
    </div>
  );
};
export default HamsterCard;
