const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const BlogReviewModule = buildModule("BlogReviewModule", (m) => {
  const token = m.contract("BlogCertificate");

  return { token };
});

module.exports = BlogReviewModule;
