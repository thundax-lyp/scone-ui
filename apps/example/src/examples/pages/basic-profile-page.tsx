import type * as React from "react";

import {
    SconeBadge,
    SconeCard,
    SconeDescriptions,
    SconeTable,
    SconeTimeline,
    type SconeTableColumn,
} from "scone-ui";

type RefundProductRow = {
    id: string;
    name: string;
    barcode: string;
    price: string;
    quantity: number;
    amount: string;
};

const refundProducts: RefundProductRow[] = [
    {
        id: "1234561",
        name: "矿泉水 550ml",
        barcode: "12421432143214321",
        price: "2.00",
        quantity: 1,
        amount: "2.00",
    },
    {
        id: "1234562",
        name: "凉茶 300ml",
        barcode: "12421432143214322",
        price: "3.00",
        quantity: 2,
        amount: "6.00",
    },
    {
        id: "1234563",
        name: "好吃的薯片",
        barcode: "12421432143214323",
        price: "7.00",
        quantity: 4,
        amount: "28.00",
    },
];

const refundProductColumns: Array<SconeTableColumn<RefundProductRow>> = [
    {
        key: "id",
        title: "商品编号",
        dataIndex: "id",
        width: 120,
    },
    {
        key: "name",
        title: "商品名称",
        dataIndex: "name",
        minWidth: 180,
    },
    {
        key: "barcode",
        title: "商品条码",
        dataIndex: "barcode",
        minWidth: 180,
    },
    {
        key: "price",
        title: "单价",
        dataIndex: "price",
        align: "end",
        width: 96,
    },
    {
        key: "quantity",
        title: "数量（件）",
        dataIndex: "quantity",
        align: "end",
        width: 112,
    },
    {
        key: "amount",
        title: "金额",
        dataIndex: "amount",
        align: "end",
        width: 96,
    },
];

export const BasicProfilePage = (): React.JSX.Element => (
    <div className="scone-example-basic-profile-page">
        <div className="scone-example-basic-profile-header">
            <div className="scone-example-basic-profile-breadcrumb">详情页 / 基础详情页</div>
            <h2>基础详情页</h2>
        </div>

        <SconeCard className="scone-example-basic-profile-card">
            <section className="scone-example-basic-profile-section" aria-labelledby="refund-title">
                <h3 id="refund-title">退款申请</h3>
                <SconeDescriptions
                    className="scone-example-basic-profile-descriptions"
                    columns={{ sm: 1, md: 2, lg: 3 }}
                    items={[
                        { key: "request-id", label: "取货单号", value: "1000000000" },
                        {
                            key: "status",
                            label: "状态",
                            value: (
                                <SconeBadge
                                    className="scone-example-basic-profile-status"
                                    count="已取货"
                                    tone="success"
                                />
                            ),
                        },
                        { key: "sales-order", label: "销售单号", value: "1234123421" },
                        { key: "child-order", label: "子订单", value: "3214321432" },
                    ]}
                />
            </section>

            <section className="scone-example-basic-profile-section" aria-labelledby="user-title">
                <h3 id="user-title">用户信息</h3>
                <SconeDescriptions
                    className="scone-example-basic-profile-descriptions"
                    columns={{ sm: 1, md: 2, lg: 3 }}
                    items={[
                        { key: "name", label: "用户姓名", value: "付小小" },
                        { key: "phone", label: "联系电话", value: "18100000000" },
                        { key: "delivery", label: "常用快递", value: "菜鸟仓储" },
                        {
                            key: "address",
                            label: "取货地址",
                            value: "浙江省杭州市西湖区万塘路18号",
                        },
                        { key: "remark", label: "备注", value: "无" },
                    ]}
                />
            </section>

            <section
                className="scone-example-basic-profile-section"
                aria-labelledby="product-title"
            >
                <h3 id="product-title">退货商品</h3>
                <SconeTable
                    ariaLabel="退货商品"
                    className="scone-example-basic-profile-table"
                    columns={refundProductColumns}
                    dataSource={refundProducts}
                    density="compact"
                    rowKey="id"
                    scroll={{ x: 760 }}
                />
                <div className="scone-example-basic-profile-total" aria-label="退款商品合计">
                    <span>总计</span>
                    <strong>36.00</strong>
                </div>
            </section>

            <section
                className="scone-example-basic-profile-section"
                aria-labelledby="progress-title"
            >
                <h3 id="progress-title">退货进度</h3>
                <SconeTimeline
                    className="scone-example-basic-profile-timeline"
                    items={[
                        {
                            key: "contact",
                            title: "联系客户",
                            description: "取货员 ID1234",
                            time: "2017-10-01 14:10",
                            tone: "success",
                        },
                        {
                            key: "pickup",
                            title: "取货员出发",
                            description: "取货员 ID1234",
                            time: "2017-10-01 14:05",
                            tone: "info",
                        },
                        {
                            key: "request",
                            title: "生成取货单",
                            description: "系统",
                            time: "2017-10-01 13:00",
                            tone: "neutral",
                        },
                    ]}
                />
            </section>
        </SconeCard>
    </div>
);
