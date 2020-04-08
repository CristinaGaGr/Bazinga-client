import React from 'react';
import './game-settings.scss';
import { Link } from 'react-router-dom';


export const GameSettings = () => {
	return (
		<div>
			<div>
				<h1 className={'titleSetting'}>How many questions do you want?</h1>
				<button>10</button>
				<button>20</button>
				<button>30</button>
				<button>40</button>
				<button>50</button>
			</div>
			<div>
				<h1 className={'titleSetting'}>Choose the level:</h1>
				<button>Easy</button>
				<button>Medium</button>
				<button>Difficult</button>
			</div>
			<div>
				<h1 className={'titleSetting'}>Choose categories:</h1>
				<button>All</button>
				<button>Books</button>
				<button>Films</button>
				<button>Music</button>
				<button>TV</button>
				<button>Videogames</button>
				<button>Science & Nature</button>
				<button>Geography</button>
				<button>History</button>
			</div>
			<Link to={'/lobby'}>Go</Link>


		</div>
	)
};