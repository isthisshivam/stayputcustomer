import React from "react";
import branch from "react-native-branch";
export default class BranchIoAnalytics {
  static instanceOf = null;

  static isInstance() {
    if (!this.instanceOf) {
      this.instanceOf = new BranchIoAnalytics();
    }
    return this.instanceOf;
  }
  async init() {
    let branchUniversalObject = await branch.createBranchUniversalObject(
      "canonicalIdentifier",
      {
        locallyIndex: true,
      }
    );
    return branchUniversalObject;
  }
}
