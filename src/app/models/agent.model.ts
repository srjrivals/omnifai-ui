// agent.model.ts
export interface Agent {
    id?: number;
    firstName: string;
    lastName: string;
    status: string;
    agentType: 'Human' | 'AI Bot';
  }
  
  export interface Customer {
    id: number;
    name: string;
    phoneNumber: string;
    status: 'Pending' | 'Contacted' | 'Purchased';
    calledBy: string;
    callsToday: number;
    callsThisWeek: number;
  }