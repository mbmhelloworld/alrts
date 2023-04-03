import React, {useEffect, useState} from "react";
import axios from 'axios';

type MatchData = {
    date: string;
    time: string;
    homeTeam: string;
    awayTeam: string;
};

type MatchGroup = {
    date: string;
    matches: MatchData[];
};

const Fixture = () => {
    // @ts-ignore
    const [matches, setMatches] = useState<MatchData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get('http://localhost:3000/api/matches');
                setMatches(response.data);
            }catch(e){
                console.log(e);
            }
        };
        fetchData();
    }, []);

    const matchGroups: MatchGroup[] = matches.reduce((groups: MatchGroup[], match: MatchData) => {
        const date = match.date;
        const groupIndex = groups.findIndex(group => group.date === date);
        if (groupIndex >= 0) {
            groups[groupIndex].matches.push(match);
        } else {
            groups.push({ date, matches: [match] });
        }
        return groups;
    }, []);

    return (
        <div>
            <h1>1. Bundesliga</h1>
            {matchGroups.map(group => (
                <div key={group.date}>
                    <h2>Upcoming Fixtures scraped on {group.date}</h2>
                    <ul>
                        {group.matches.map((match: { date: any; time: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; homeTeam: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; awayTeam: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                            <li key={match.date + match.time}>
                                {match.time} - {match.homeTeam} vs {match.awayTeam}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Fixture;