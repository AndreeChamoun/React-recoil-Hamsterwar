import PostHamster from "./PostHams";
import HamsterCard from "./HamsterCard";
import { makeImg } from "../../utils"
import styles from "../../styles/gallery.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import allHamsters from "../../atoms/allHamsters";
import { HamsterModel } from "../../models/HamsterModel";


const Gallery = () => {
  const [data, setData] = useRecoilState<HamsterModel[]>(allHamsters);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(makeImg("/hamsters/"));
      const apiData: any = await response.json();

      setData(apiData as HamsterModel[]);
    }
    getData();
    console.log(data);
  }, []);
  return (
    <div className={styles.container}>
      <header className={styles.head}>
        <h2>Add another hamster warrior to the battle?</h2>
        <h3>
          Fill in information about the new hamster{" "}
        </h3>

        <button className={styles.add} onClick={() => setToggle(!toggle)}>
          Add Hamster
        </button>
        {toggle && <PostHamster />}
      </header>

      <main className={styles.mainContent}>
        <div className={styles.wrapping}>
          {data
            ? data.map((hamster) => (
                <HamsterCard
                  hamster={hamster}
                  key={Math.floor(Math.random() * 100) + hamster.id}
                />
              ))
            : "Loading"}
        </div>
      </main>
    </div>
  );
};

export default Gallery;
