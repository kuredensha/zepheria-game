import { levels } from './levels';

import React, { useEffect, useState } from 'react';

import '../scss/main.scss';
import './leaderboards.scss';

import type { Config } from '@kaetram/common/config';

function camelCase(str: string): string {
    return str
        .toLowerCase()
        .replace(/([_-][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}

interface Result {
    rank: number;
    name: string;
    level: number;
    experience: number;
}

interface InputItem {
    _id: string;
    experience: number;
}

interface TotalExperience {
    _id: string;
    experience: number;
}

function skillExpArrayToLevel(skillsExp: number[]): number {
    let level = 1,
        skills = skillsExp.map((exp) => levels.expToLevel(exp));

    for (let skill of skills) level += skill - 1;
    return level;
}

function transformList(data: { list: InputItem[][]; total: TotalExperience[] }): Result[] {
    let idMap: { [key: string]: number[] } = {},
        totalMap: { [key: string]: number } = {},
        { list, total } = data;

    // Populate idMap with skills
    for (let subArray of list)
        for (let item of subArray) {
            if (!idMap[item._id]) idMap[item._id] = [];
            idMap[item._id].push(item.experience);
        }

    // Populate totalMap with totalExperience
    for (let item of total) totalMap[item._id] = item.experience;

    return Object.keys(idMap)
        .map((_id) => {
            return {
                name: _id,
                level: skillExpArrayToLevel(idMap[_id]),
                experience: totalMap[_id] || 0 // Default to 0 if not found
            };
        })
        .sort((a, b) => b.experience - a.experience)
        .map((item, i) => {
            return {
                ...item,
                rank: i + 1
            };
        });
}

export const Leaderboards = () => {
    let [results, setResults] = useState<Result[]>([]);

    useEffect(() => {
        // Parse environment variables and set config
        let envConfig = process.env as { [key: string]: string };
        for (let key in envConfig) {
            let camelCaseKey = camelCase(key) as keyof Config;
            envConfig[camelCaseKey] = envConfig[key] as never;
        }
        let clientHost =
                envConfig.clientRemoteHost ||
                (envConfig.hubEnabled ? envConfig.hubHost : envConfig.host),
            clientPort =
                envConfig.clientRemotePort ||
                (envConfig.hubEnabled ? envConfig.hubPort : envConfig.port),
            hub =
                envConfig.ssl === 'true'
                    ? `https://${clientHost}`
                    : `http://${clientHost}:${clientPort}`;

        // Fetch initial data
        fetch(`${hub}/leaderboards/new`)
            .then((response) => response.json())
            .then((data) => {
                let formatted = transformList(data);
                setResults(formatted);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div id="game-container">
            <div className="leaderboards-body">
                <div className="leaderboards-table">
                    <div className="leaderboards-content">
                        <h1 className="leaderboard-title">Leaderboard</h1>
                        <div className="table-wrapper">
                            <table className="leaderboard-table styled-table">
                                <thead className="table-header">
                                    <tr className="table-row">
                                        <th className="table-header-cell">Rank</th>
                                        <th className="table-header-cell">Name</th>
                                        <th className="table-header-cell">Level</th>
                                        <th className="table-header-cell">Experience</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {results.map((result: Result) => (
                                        <tr className="table-row" key={result.name}>
                                            <td className="table-cell">{result.rank}</td>
                                            <td className="table-cell">{result.name}</td>
                                            <td className="table-cell">{result.level}</td>
                                            <td className="table-cell">{result.experience}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <a href="/">Go back</a>
            </div>
        </div>
    );
};
