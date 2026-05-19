import { UserRepository } from '../repositories/user.repository.js';
import { TransactionRepository } from '../repositories/transaction.repository.js';
import { type User } from '../models/user.model.js';

export class UserService {
  private userRepository = new UserRepository();
  private transactionRepository = new TransactionRepository();

  async updateUserService(userId: string, updateData: Partial<User>) {
    return await this.userRepository.update(userId, updateData);
  }

  async getProfileWithFinancials(user: any) {
    const userId = user._id.toString();

    const userPlainObject = typeof user.toObject === 'function' ? user.toObject() : user;

    const now = new Date();
    
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const currentMonthData = await this.transactionRepository.getSummaryByPeriod(userId, startOfCurrentMonth, endOfCurrentMonth);
    const lastMonthData = await this.transactionRepository.getSummaryByPeriod(userId, startOfLastMonth, endOfLastMonth);

    const calculatePercentage = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const incomePercentage = calculatePercentage(currentMonthData.income, lastMonthData.income);
    const expensePercentage = calculatePercentage(currentMonthData.expense, lastMonthData.expense);

    return {
      ...userPlainObject,
      financialSummary: {
        currentMonth: {
          income: currentMonthData.income,
          expense: currentMonthData.expense,
        },
        analytics: {
          incomeChangePercentage: incomePercentage,
          expenseChangePercentage: expensePercentage
        }
      }
    };
  }
}