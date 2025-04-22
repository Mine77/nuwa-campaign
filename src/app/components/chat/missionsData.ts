export interface Mission {
    id: string;
    title: string;
    description: string;
    suggestionText: string;
    readTime?: string;
    suggested?: boolean;
}

export const MISSIONS: Mission[] = [
    {
        id: "follow-x",
        title: "Follow X",
        description: "Follow X to get more rewards",
        suggestionText: "I want to get rewards for following X account",
        readTime: "1 mins",
        suggested: true
    },
    {
        id: "lottery-ticket",
        title: "Lottery Ticket",
        description: "Get a lottery ticket for a chance to win",
        suggestionText: "I want to Get a lottery ticket for a chance to win rewards",
        readTime: "1 mins"
    },
    {
        id: "twitter-score",
        title: "Twitter Score",
        description: "Help me to evaluate my twitter score",
        suggestionText: "Help me to evaluate my twitter score",
        readTime: "1 mins",
        suggested: true
    },
    {
        id: "content-competition",
        title: "Content Competition",
        description: "I created content!",
        suggestionText: "Help me to evaluate my content competition and give me rewards",
        readTime: "10 mins",
    },
]; 