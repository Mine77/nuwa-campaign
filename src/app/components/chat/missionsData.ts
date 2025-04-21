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
        suggestionText: "I want to follow X",
        readTime: "15 mins"
    },
    {
        id: "connect-wallet",
        title: "Connect Wallet",
        description: "Connect your wallet to participate",
        suggestionText: "I want to connect my wallet",
        readTime: "30 mins"
    },
    {
        id: "referral",
        title: "Referral",
        description: "Use your referral code to invite friends",
        suggestionText: "I want to use my referral code",
        readTime: "21 mins"
    },
    {
        id: "lottery-ticket",
        title: "Lottery Ticket",
        description: "Buy a lottery ticket for a chance to win",
        suggestionText: "I want to buy a lottery ticket",
        readTime: "45 mins"
    },
    {
        id: "coming-up",
        title: "Coming Up",
        description: "See what's coming up next",
        suggestionText: "I want to see what's coming up",
        readTime: "14 mins"
    },
    {
        id: "twitter-score",
        title: "Twitter Score",
        description: "Help me to evaluate my twitter score",
        suggestionText: "I need help to evaluate my twitter score",
        suggested: true
    },
    {
        id: "fortune-telling",
        title: "Fortune Telling",
        description: "Help me to evaluate my fortune",
        suggestionText: "I need help to evaluate my fortune",
        suggested: true
    },
    {
        id: "content-competition",
        title: "Content Competition",
        description: "I created content!",
        suggestionText: "Help me to evaluate my content competition",
        suggested: true
    },
    {
        id: "find-soulmate",
        title: "Find Soulmate",
        description: "I need a soulmate!",
        suggestionText: "Help me to find my soulmate",
        suggested: true
    },
]; 