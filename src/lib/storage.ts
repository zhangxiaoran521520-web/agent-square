import type { Agent, User } from '@/types';

const FEISHU_BASE_APP_TOKEN = process.env.NEXT_PUBLIC_FEISHU_BASE_APP_TOKEN || '';
const FEISHU_TABLE_ID = process.env.NEXT_PUBLIC_FEISHU_TABLE_ID || 'tbl_agent';

async function getBaseAccessToken(): Promise<string> {
  const response = await fetch('https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: process.env.NEXT_PUBLIC_FEISHU_APP_ID || '',
      app_secret: process.env.FEISHU_APP_SECRET || '',
    }),
  });
  
  const data = await response.json();
  return data.app_access_token;
}

export async function getAllAgents(): Promise<Agent[]> {
  const token = await getBaseAccessToken();
  
  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_APP_TOKEN}/tables/${FEISHU_TABLE_ID}/records`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  
  const data = await response.json();
  
  if (data.code === 0) {
    return data.data.items.map((item: any) => ({
      id: item.record_id,
      name: item.fields['名称'] || '',
      description: item.fields['描述'] || '',
      icon: item.fields['图标'] || '🤖',
      systemPrompt: item.fields['系统提示词'] || '',
      tools: JSON.parse(item.fields['工具'] || '[]'),
      authorId: item.fields['作者ID'] || '',
      authorName: item.fields['作者'] || '',
      usageCount: item.fields['使用次数'] || 0,
      rating: item.fields['评分'] || 0,
      createdAt: item.fields['创建时间'] || '',
      updatedAt: item.fields['更新时间'] || '',
    }));
  }
  
  return [];
}

export async function getAgentById(id: string): Promise<Agent | null> {
  const token = await getBaseAccessToken();
  
  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_APP_TOKEN}/tables/${FEISHU_TABLE_ID}/records/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
  
  const data = await response.json();
  
  if (data.code === 0) {
    const item = data.data;
    return {
      id: item.record_id,
      name: item.fields['名称'] || '',
      description: item.fields['描述'] || '',
      icon: item.fields['图标'] || '🤖',
      systemPrompt: item.fields['系统提示词'] || '',
      tools: JSON.parse(item.fields['工具'] || '[]'),
      authorId: item.fields['作者ID'] || '',
      authorName: item.fields['作者'] || '',
      usageCount: item.fields['使用次数'] || 0,
      rating: item.fields['评分'] || 0,
      createdAt: item.fields['创建时间'] || '',
      updatedAt: item.fields['更新时间'] || '',
    };
  }
  
  return null;
}

export async function createAgent(agent: Omit<Agent, 'id' | 'usageCount' | 'rating' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const token = await getBaseAccessToken();
  
  const response = await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_APP_TOKEN}/tables/${FEISHU_TABLE_ID}/records`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          '名称': agent.name,
          '描述': agent.description,
          '图标': agent.icon,
          '系统提示词': agent.systemPrompt,
          '工具': JSON.stringify(agent.tools),
          '作者ID': agent.authorId,
          '作者': agent.authorName,
        },
      }),
    }
  );
  
  const data = await response.json();
  
  if (data.code === 0) {
    return data.data.record.record_id;
  }
  
  throw new Error(data.msg);
}

export async function updateAgent(id: string, agent: Partial<Agent>): Promise<void> {
  const token = await getBaseAccessToken();
  
  const fields: Record<string, any> = {};
  if (agent.name !== undefined) fields['名称'] = agent.name;
  if (agent.description !== undefined) fields['描述'] = agent.description;
  if (agent.icon !== undefined) fields['图标'] = agent.icon;
  if (agent.systemPrompt !== undefined) fields['系统提示词'] = agent.systemPrompt;
  if (agent.tools !== undefined) fields['工具'] = JSON.stringify(agent.tools);
  
  await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_APP_TOKEN}/tables/${FEISHU_TABLE_ID}/records/${id}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }
  );
}

export async function deleteAgent(id: string): Promise<void> {
  const token = await getBaseAccessToken();
  
  await fetch(
    `https://open.feishu.cn/open-apis/bitable/v1/apps/${FEISHU_BASE_APP_TOKEN}/tables/${FEISHU_TABLE_ID}/records/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
}

export async function incrementUsageCount(id: string): Promise<void> {
  const agent = await getAgentById(id);
  if (agent) {
    await updateAgent(id, { usageCount: agent.usageCount + 1 });
  }
}
