import { gql } from "@apollo/client";

export const AllLb = gql`
    query GetLeaderBoards {
        leaderBoards(sort: ["createdAt:desc"]) {
            data {
                id
                attributes {
                    createdAt
                    Board {
                        id
                        Name
                        Score
                    }
                }
            }
        }
    }
`;

export const LB = gql`
    query GetLeaderBoard {
        lbs(sort: ["score:asc", "createdAt:asc"]) {
            data {
                id
                attributes {
                    displayName
                    scoreOne
                    scoreTwo
                }
            }
        }
    }
`;

export const CREATEARCHIVE = gql`
    mutation CreateArchive(
        $name1: String
        $score1: Int
        $name2: String
        $score2: Int
        $name3: String
        $score3: Int
        $name4: String
        $score4: Int
        $name5: String
        $score5: Int
        $name6: String
        $score6: Int
        $name7: String
        $score7: Int
        $name8: String
        $score8: Int
        $name9: String
        $score9: Int
        $name10: String
        $score10: Int
    ) {
        createLeaderBoard(
            data: {
                Board: [
                    { Name: $name1, Score: $score1 }
                    { Name: $name2, Score: $score2 }
                    { Name: $name3, Score: $score3 }
                    { Name: $name4, Score: $score4 }
                    { Name: $name5, Score: $score5 }
                    { Name: $name6, Score: $score6 }
                    { Name: $name7, Score: $score7 }
                    { Name: $name8, Score: $score8 }
                    { Name: $name9, Score: $score9 }
                    { Name: $name10, Score: $score10 }
                ]
            }
        ) {
            data {
                id
            }
        }
    }
`;

export const NEWENTRY = gql`
    mutation CREATE_ENTRY($name: String!, $score: Int) {
        createLb(data: { name: $name, score: $score }) {
            data {
                id
            }
        }
    }
`;

export const DELETEENTRY = gql`
    mutation DELETE_ENTRY($id: ID!) {
        deleteLb(id: $id) {
            data {
                id
            }
        }
    }
`;

export const EDITENTRY = gql`
    mutation UPDATE_ENTRY($id: ID!, $name: String!, $score: Int) {
        updateLb(id: $id, data: { name: $name, score: $score }) {
            data {
                id
            }
        }
    }
`;
