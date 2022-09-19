import { makeImg } from "../../utils";
import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import allHamsters from "../../atoms/allHamsters";
import { HamsterModel } from "../../models/HamsterModel";
import styles from "../../styles/posthams.module.css";


const PostHamster = () => {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [favFood, setFavFood] = useState<string>('')
  const [loves, setLoves] = useState<string>('')
  const [imgName, setImgName] = useState<string>('')
  const [data, setData] = useRecoilState<HamsterModel[]>(allHamsters);

  const newHamster: HamsterModel = {
    name: name,
    age: Number(age),
    favFood: favFood,
    loves: loves,
    imgName: imgName,
    wins: 0,
    defeats: 0,
    games: 0,
    result: 0,
    id: ''
  }

  const nameValidation = newHamster.name !== ''
  const ageValidation = newHamster.age >= 1 && Number.isInteger(newHamster.age) === true
  const favFoodValidation = newHamster.favFood !== ''
  const loveValidation = newHamster.loves !== ''
  const imgnameValidation = newHamster.imgName !== ''
  const formIsValid = nameValidation && ageValidation && favFoodValidation && loveValidation && imgnameValidation


  const handleAddHamster = async () => {

    const response: Response = await fetch(makeImg('/hamsters'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newHamster)
    })
    if (response.status === 200) {
      async function getData() {
        const response: Response = await fetch(makeImg('/hamsters/'))
        const apiData: any = await response.json()

        setData(apiData as HamsterModel[])
      }
      getData()
    }
    setName('')
    setAge('')
    setFavFood('')
    setLoves('')
    setImgName('')

  }
  function onClickPrevDefault(e: FormEvent<HTMLFormElement>, data: HamsterModel[]): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <section>
        <form onSubmit={(e) => onClickPrevDefault(e, data)}>
          {nameValidation === false ? <p>Write a name</p> : <p>Success!</p>}
          <input
            className={styles.forms}
            type="text"
            placeholder="Name"
            value={name}
            onChange={event => setName(event.target.value)}
          />
            {ageValidation === false ? <p>Write in age</p> : <p>Success!</p>}
          <input
            className={styles.forms}
            type="number"
            placeholder="Age"
            value={age}
            onChange={event => setAge(event.target.value)}
          />
            {favFoodValidation === false ? <p>Write in what hamster loves to eat</p> : <p>Success!</p>}
            <input
            className={styles.forms}
            type="text"
            placeholder="Loves"
            value={loves}
            onChange={event => setLoves(event.target.value)}/>

          {loveValidation === false ? <p>Please write what hamster loves to do</p> : <p>Success!</p>}

          <input
            className={styles.forms}
            type="text"
            placeholder="Picture/link"
            value={imgName}
            onChange={event => setImgName(event.target.value)}/>
          {imgnameValidation === false ? <p>Enter a web link or upload an image </p> : <p>Success!</p>}
          <button className={styles.forms} disabled={!formIsValid} onClick={handleAddHamster}>
            Add a hamster
          </button>
        </form>
      </section>
    </div>
  );
};

export default PostHamster;
