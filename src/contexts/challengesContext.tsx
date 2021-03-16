import {createContext, ReactNode, useEffect, useState} from 'react'
import Cookies from "js-cookie"
import challenges from "../../challenges.json"
import {LevelUpModal} from '../components/LevelUpModal'

interface Challenge {
	type: 'body' | 'eye';
	description: string;
	amount: number;
}

interface ChallengesContextData {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	experienceToNextLevel: number;
	startNewChallenge: () => void;
	levelUp: () => void;
	resetChallenge: () => void;
	completeChallenge: () => void;
	closeLevelUpModal: () => void;
	activeChallenge: Challenge;
}


interface ChallengesProviderProps{
	children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
	children, 
	...rest
}: ChallengesProviderProps) {

	const [level, setLevel] = useState(rest.level ?? 1)
	const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
	const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
	const [activeChallenge, setActiveChallenge] = useState(null)
	const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
	
	const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

	useEffect(()=>{
		Notification.requestPermission();
	},[])

	useEffect(()=>{
		Cookies.set('level', String(level));
		Cookies.set('currentExperience', String(currentExperience));
		Cookies.set('challengesCompleted', String(challengesCompleted));
	},[level, currentExperience, challengesCompleted])

	const levelUp = () => {
		setLevel(level + 1)
		setIsLevelUpModalOpen(true)
	}

	const closeLevelUpModal = () => setIsLevelUpModalOpen(false)

	const startNewChallenge = () => {
		const challenge = challenges[Math.floor(Math.random() * challenges.length)]
		setActiveChallenge(challenge)
		
		new Audio('/notification.mp3').play()

		if(Notification.permission ==='granted'){
			new Notification('New Challenge 🎉', {
				body: `Earn ${challenge.amount}xp!`
			})
		}
	}

	const resetChallenge = () => setActiveChallenge(null)
	
	const completeChallenge = () => {
		if(!activeChallenge){
			return
		}

		const {amount} = activeChallenge;

		let finalExperience = currentExperience + amount;

		if(finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel;
			levelUp()
		}

		setCurrentExperience(finalExperience);
		setActiveChallenge(null)
		setChallengesCompleted(challengesCompleted + 1)
	}

	return(
		<ChallengesContext.Provider value={{
			level,
			levelUp,
			currentExperience,
			challengesCompleted,
			startNewChallenge,
			activeChallenge,
			resetChallenge,
			experienceToNextLevel,
			completeChallenge,
			closeLevelUpModal
		}}>

			{children}

			{isLevelUpModalOpen && <LevelUpModal />}
			</ChallengesContext.Provider>
	)
}


