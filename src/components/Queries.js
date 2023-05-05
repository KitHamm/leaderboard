import { gql } from "@apollo/client";

export const LB = gql`
    query Getleaderboard {
        lbs(sort: ["score:desc", "createdAt:asc"]) {
            data {
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
