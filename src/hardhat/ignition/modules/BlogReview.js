const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const BlogReviewModule = buildModule("BlogReviewModule", (m) => {
  const token = m.contract("BlogReview");

  return { token };
});

module.exports = BlogReviewModule;
