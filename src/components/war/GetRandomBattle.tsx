import { useEffect, useState } from "react";
import { HamsterModel } from "../../models/HamsterModel";
import { makeImg, picImport } from "../../utils";
import styles from "../../styles/getrandombattle.module.css";

const GetRandom = () => {

  const [hamsterOne, sethamsterOne] = useState<null | HamsterModel>(null)
  const [hamsterTwo, sethamsterTwo] = useState<null | HamsterModel>(null)
  const [wins, setwins] = useState<null | HamsterModel>(null)
  const [lost, setlost] = useState<null | HamsterModel>(null)
  const [hamsterOneWin, sethamsterOneWin] = useState<boolean>(false)
  const [hamsterTwoWin, sethamsterTwoWin] = useState<boolean>(false)


  const winninghamsterOne = () => {

    if (hamsterOne != null) {
      let newWins = hamsterOne.wins + 1
      let newGames = hamsterOne.games + 1
      let newResult = hamsterOne.wins - hamsterOne.defeats

      const getWins = {
        ...hamsterOne,
        wins: newWins,
        games: newGames,
        result: newResult
      }

      setwins(getWins)
      sethamsterOneWin(true)

      fetch(makeImg(`/hamsters/${hamsterOne.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getWins),
      })

    }

    if (hamsterTwo != null) {
      let newDefeats = hamsterTwo.defeats + 1
      let newGames = hamsterTwo.games + 1
      let newResult = hamsterTwo.wins - hamsterTwo.defeats

      const getLost = {
        ...hamsterTwo,
        defeats: newDefeats,
        games: newGames,
        result: newResult
      }
      setlost(getLost)

      fetch(makeImg(`/hamsters/${hamsterTwo.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getLost),
      })

    }
  }

  const winninghamsterTwo = () => {
    console.log('second wins')

    if (hamsterTwo != null) {
      let newWins = hamsterTwo.wins + 1
      let newGames = hamsterTwo.games + 1
      let newResult = hamsterTwo.wins - hamsterTwo.defeats

      const getWins = {
        ...hamsterTwo,
        wins: newWins,
        games: newGames,
        result: newResult
      }
      setwins(getWins)
      sethamsterTwoWin(true)

      fetch(makeImg(`/hamsters/${hamsterTwo.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getWins),

      })

    }
    if (hamsterOne != null) {
      let newDefeats = hamsterOne.defeats + 1
      let newGames = hamsterOne.games + 1
      let newResult = hamsterOne.wins - hamsterOne.defeats

      const getLost = {
        ...hamsterOne,
        defeats: newDefeats,
        games: newGames,
        result: newResult
      }
      setlost(getLost)

      fetch(makeImg(`/hamsters/${hamsterOne.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getLost),

      })
    }
  }

  const NewBattle = () => {
    window.location.reload();
  }
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(makeImg('/hamsters/random'))
      const apiData: any = await response.json()

      sethamsterOne(apiData as HamsterModel)
    }
    getData()

  }, [])
  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(makeImg('/hamsters/random'))
      const apiData: any = await response.json()

      sethamsterTwo(apiData as HamsterModel)
    }
    getData()

  }, [])

  return (
    <div className={styles.battle}>
      <p className={styles.message}>
        Vote by clicking on the cutest hamster!
      </p>
      <div className={styles.voting}>

        {hamsterOne && hamsterTwo ?
          <div className={styles.hamster1}>
            <img className={styles.size} src={picImport(hamsterTwo.imgName)} />
            <h3 className={styles.text}>My name is {hamsterTwo.name} and I'm {hamsterTwo.age}yrs old</h3>
            {hamsterTwoWin ? <div>
              <p>wins {wins?.wins} losts {wins?.defeats}</p> </div> : null}
            {hamsterOneWin ? <div>
              <p>wins {lost?.wins} losts {lost?.defeats}</p> </div> : null}

            <button className={styles.vote} disabled={hamsterOneWin || hamsterTwoWin}
             onClick={winninghamsterTwo}>Vote me!</button>
          </div> : <p>Loading hamster </p>
        }

{hamsterOne && hamsterTwo ?
          <div className={styles.hamster2}>
            <img className={styles.size} src={picImport(hamsterOne.imgName)} />
            <h3 className={styles.text}>My name is {hamsterOne.name} and I'm {hamsterOne.age}yrs old</h3>
            {hamsterOneWin ? <div>
              <p>Wins {wins?.wins} Losts {wins?.defeats}</p> </div> : null}
            {hamsterTwoWin ? <div>
              <p>Wins {lost?.wins} Losts {lost?.defeats}</p> </div> : null}

            <button className={styles.vote} disabled={hamsterOneWin || hamsterTwoWin} onClick={winninghamsterOne}>Vote me!</button>
          </div> : <p> Loading hamster</p>
        }
      </div>

      {wins != null ?
        <div className={styles.winninghamster}>
          <p> 🥇 The winner is {wins.name} 🥇
          <br /> Total victory= {wins.wins} <br />Total defeats= {wins.defeats} <br />Total matches= {wins.games} </p>
          <button className={styles.newbattle}onClick={NewBattle}>Start a new match</button>
        </div>
        : <p></p>}
    </div>
  )
}
export default GetRandom;
