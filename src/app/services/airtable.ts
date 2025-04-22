import Airtable from 'airtable';

// 初始化Airtable客户端
const base = new Airtable({
    apiKey: process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || '');

// 定义表单数据的接口
export interface FormData {
    email: string;
    agentname: string;
    product?: string;
    description?: string;
}

// 定义排行榜用户数据的接口
export interface LeaderboardUser {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    points: number;
    rank?: number;
}

// 定义奖励记录数据的接口
export interface RewardData {
    userName: string;
    points: number;
    mission: string;
}

// 提交表单数据到Airtable
export const submitFormToAirtable = async (formData: FormData): Promise<boolean> => {
    try {
        // 假设您的表名为"Contacts"
        const table = base('Early Access Registry');

        // 创建记录
        await table.create([
            {
                fields: {
                    Email: formData.email,
                    Agentname: formData.agentname,
                    Link: formData.product || '',
                    Description: formData.description || '',
                }
            }
        ]);

        return true;
    } catch (error) {
        console.error('Error submitting form to Airtable:', error);
        return false;
    }
};

// 获取排行榜数据
export const getLeaderboardData = async (): Promise<LeaderboardUser[]> => {
    try {
        const table = base('Campaign Points');

        // 获取所有记录，按Points字段降序排序
        const records = await table.select({
            sort: [{ field: 'Points', direction: 'desc' }]
        }).all();

        // 转换记录为LeaderboardUser格式
        const users: LeaderboardUser[] = records.map((record, index) => ({
            id: record.id,
            name: record.get('Name') as string,
            handle: record.get('Handle') as string,
            avatar: record.get('Avatar') as string,
            points: record.get('Points') as number,
            rank: index + 1
        }));

        return users;
    } catch (error) {
        console.error('Error fetching leaderboard data from Airtable:', error);
        return [];
    }
};

// 添加奖励记录到Airtable
export const addRewardToAirtable = async (rewardData: RewardData): Promise<{ success: boolean; error?: string }> => {
    try {
        // 先添加奖励记录
        const rewardTable = base('Points Reward Log');
        await rewardTable.create([
            {
                fields: {
                    RewardTo: rewardData.userName,
                    Points: rewardData.points,
                    Mission: rewardData.mission,
                }
            }
        ]);

        // 奖励记录添加成功后，更新用户总积分
        const pointsTable = base('Campaign Points');

        // 查找用户记录
        const records = await pointsTable.select({
            filterByFormula: `{Handle} = '${rewardData.userName}'`,
            maxRecords: 1
        }).all();

        if (records.length === 0) {
            return { success: false, error: 'User not found' };
        }

        // 更新现有用户积分
        const record = records[0];
        const currentPoints = record.get('Points') as number || 0;

        await pointsTable.update(record.id, {
            Points: currentPoints + rewardData.points
        });

        return { success: true };
    } catch (error) {
        console.error('Error adding reward to Airtable:', error);
        return { success: false, error: 'Failed to add reward' };
    }
};

// 检查用户是否已经从特定任务获得过奖励
export const checkUserRewardHistory = async (userName: string, mission: string): Promise<boolean> => {
    try {
        const table = base('Points Reward Log');

        // 查询记录
        const records = await table.select({
            filterByFormula: `AND({RewardTo} = '${userName}', {Mission} = '${mission}')`,
            maxRecords: 1
        }).all();

        // 如果找到记录，说明用户已经获得过该任务的奖励
        return records.length > 0;
    } catch (error) {
        console.error('Error checking user reward history from Airtable:', error);
        return false;
    }
}; 