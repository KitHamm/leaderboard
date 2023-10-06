import { gql } from "@apollo/client";

export const LB = gql`
    query GetLeaderBoard {
        lbs(
            filters: { show: { eq: true } }
            sort: ["score:asc", "createdAt:asc"]
        ) {
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
        lbs(
            filters: { show: { eq: true } }
            sort: ["score:asc", "createdAt:asc"]
        ) {
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
        lbs(sort: ["createdAt:desc"]) {
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

export const setNoShow = gql`
    mutation setNoShow($id: ID!) {
        updateLb(id: $id, data: { show: false }) {
            data {
                id
            }
        }
    }
`;

export const updateView = gql`
    mutation updateView($view: ENUM_LEADERBOARDVIEW_VIEW) {
        updateLeaderboardView(data: { view: $view }) {
            data {
                attributes {
                    view
                }
            }
        }
    }
`;

export const setShow = gql`
    mutation setNoShow($id: ID!) {
        updateLb(id: $id, data: { show: true }) {
            data {
                id
            }
        }
    }
`;

export const LOGIN = gql`
    mutation LogIn($username: String!, $password: String!) {
        login(input: { identifier: $username, password: $password }) {
            jwt
            user {
                username
            }
        }
    }
`;

export const AllTimeLeaders = gql`
    query AllTimeLeaders {
        lbs(sort: ["score:asc", "createdAt:asc"], pagination: { limit: 9 }) {
            data {
                id
                attributes {
                    firstName
                    lastName
                    email
                    displayName
                    scoreOne
                    scoreTwo
                    score
                }
            }
        }
    }
`;

export const TodayLeadersBoard = gql`
    query TodayLeaders($today: DateTime) {
        lbs(
            sort: ["score:asc", "createdAt:asc"]
            filters: { createdAt: { gte: $today } }
            pagination: { limit: 9 }
        ) {
            data {
                id
                attributes {
                    createdAt
                    firstName
                    lastName
                    email
                    displayName
                    scoreOne
                    scoreTwo
                    score
                }
            }
        }
    }
`;

export const NowLeadersBoard = gql`
    query TodayLeaders($now: DateTime) {
        lbs(
            sort: ["score:asc", "createdAt:asc"]
            filters: { createdAt: { gte: $now } }
            pagination: { limit: 9 }
        ) {
            data {
                id
                attributes {
                    createdAt
                    firstName
                    lastName
                    email
                    displayName
                    scoreOne
                    scoreTwo
                    score
                }
            }
        }
    }
`;

export const PlaceToday = gql`
    query PlaceToday($today: DateTime) {
        lbs(
            sort: ["score:asc", "createdAt:asc"]
            filters: { createdAt: { gte: $today } }
        ) {
            data {
                id
                attributes {
                    score
                }
            }
        }
    }
`;

export const PlaceAllTime = gql`
    query PlaceToday {
        lbs(sort: ["score:asc", "createdAt:asc"]) {
            data {
                id
                attributes {
                    score
                }
            }
        }
    }
`;

export const LeaderboardView = gql`
    query leaderBoardView {
        leaderboardView {
            data {
                attributes {
                    view
                    updatedAt
                }
            }
        }
    }
`;
