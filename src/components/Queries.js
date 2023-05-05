import { gql } from "@apollo/client";

export const LB = gql`
    query Getleaderboard {
        lbs(sort: ["score:desc", "createdAt:asc"]) {
            data {
                id
                attributes {
                    name
                    score
                }
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
