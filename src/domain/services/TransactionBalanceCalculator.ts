import { Transaction } from '../entities/transaction/Transaction';

export class TransactionBalanceCalculator {
    execute(transactionList: Transaction[]): number {
        const totalamount = transactionList.reduce((acc, mov) => acc + mov.amount, 0);
        return totalamount;
    }
}
