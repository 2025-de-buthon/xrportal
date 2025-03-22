# 거래 컨트롤러 (app/controllers/transactionController.js)
const { Transaction } = require('../models');

// 거래 생성
exports.createTransaction = async (req, res) => {
    try {
        const { post_id, seller_id, buyer_id, price, gas_fee, transaction_type, status } = req.body;

        const newTransaction = await Transaction.create({
            post_id,
            seller_id,
            buyer_id,
            price,
            gas_fee,
            transaction_type,
            status
        });

        res.status(201).json({ message: '거래가 성공적으로 생성되었습니다.', transactionId: newTransaction.transaction_id });
    } catch (error) {
        res.status(500).json({ message: '거래 생성 중 오류가 발생했습니다.', error: error.message });
    }
};

// 거래 조회
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.transactionId);
        if (!transaction) return res.status(404).json({ message: '거래를 찾을 수 없습니다.' });

        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: '거래 조회 중 오류가 발생했습니다.', error: error.message });
    }
};
