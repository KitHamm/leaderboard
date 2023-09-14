import { gql } from "@apollo/client";

export const LB = gql`
    query GetLeaderBoard {
        lbs(sort: ["score:asc", "createdAt:asc"]) {
            data {
                id
                attributes {
                    displayName
                    score
                }
            }
        }
    }
`;

export const LBBackend = gql`
    query GetLeaderBoard {
        lbs(sort: ["score:asc", "createdAt:asc"]) {
            data {
                id
                attributes {
                    createdAt
                    displayName
                    firstName
                    lastName
                    email
                    scoreOne
                    scoreTwo
                    score
                }
            }
        }
    }
`;

export const AllContestantBackend = gql`
    query GetLeaderBoard {
        lbs(sort: ["createdAt:asc"]) {
            data {
                id
                attributes {
                    displayName
                    firstName
                    lastName
                    email
                    scoreOne
                    scoreTwo
                    score
                }
            }
        }
    }
`;

export const NEWENTRY = gql`
    mutation CREATE_ENTRY(
        $displayName: String!
        $email: String!
        $firstName: String!
        $lastName: String!
        $scoreOne: Int
        $scoreTwo: Int
        $score: Int
    ) {
        createLb(
            data: {
                displayName: $displayName
                email: $email
                firstName: $firstName
                lastName: $lastName
                scoreOne: $scoreOne
                scoreTwo: $scoreTwo
                score: $score
            }
        ) {
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
    mutation UPDATE_ENTRY(
        $id: ID!
        $displayName: String!
        $firstName: String!
        $lastName: String!
        $email: String!
        $scoreOne: Int
        $scoreTwo: Int
        $score: Int
    ) {
        updateLb(
            id: $id
            data: {
                displayName: $displayName
                firstName: $firstName
                lastName: $lastName
                email: $email
                scoreOne: $scoreOne
                scoreTwo: $scoreTwo
                score: $score
            }
        ) {
            data {
                id
            }
        }
    }
`;
