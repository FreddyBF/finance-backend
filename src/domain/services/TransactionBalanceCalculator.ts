import { Transaction } from '../entities/transaction/Transaction';

export class TransactionBalanceCalculator {
    execute(transactionList: Transaction[]): number {
        const totalBalance = transactionList.reduce((acc, mov) => acc + mov.balance, 0);
        return totalBalance;
    }
}
