import { generateUUIDs } from "../src/generate-uuid";
import { performance } from "perf_hooks";

describe("Performance Test", () => {
  it("should compare includes and Set.has performance for existing and non-existing UUIDs", () => {
    const count = 1000000;
    const memberIds = generateUUIDs(count);
    const memberSet = new Set(memberIds);

    const existingUUID = memberIds[Math.floor(Math.random() * count)] as string;
    const nonExistingUUID = generateUUIDs(1)[0] as string;

    // Test 존재하는 UUID
    const startIncludesExisting = performance.now();
    const existsIncludes = memberIds.includes(existingUUID);
    const endIncludesExisting = performance.now();
    console.log(
      `Array.includes(existingUUID): ${existsIncludes}, 소요 시간: ${(
        endIncludesExisting - startIncludesExisting
      ).toFixed(3)} ms`
    );

    const startSetExisting = performance.now();
    const existsSet = memberSet.has(existingUUID);
    const endSetExisting = performance.now();
    console.log(
      `Set.has(existingUUID): ${existsSet}, 소요 시간: ${(
        endSetExisting - startSetExisting
      ).toFixed(3)} ms`
    );

    // Test 존재하지 않는 UUID
    const startIncludesNonExisting = performance.now();
    const existsIncludesNonExisting = memberIds.includes(nonExistingUUID);
    const endIncludesNonExisting = performance.now();
    console.log(
      `Array.includes(nonExistingUUID): ${existsIncludesNonExisting}, 소요 시간: ${(
        endIncludesNonExisting - startIncludesNonExisting
      ).toFixed(3)} ms`
    );

    const startSetNonExisting = performance.now();
    const existsSetNonExisting = memberSet.has(nonExistingUUID);
    const endSetNonExisting = performance.now();
    console.log(
      `Set.has(nonExistingUUID): ${existsSetNonExisting}, 소요 시간: ${(
        endSetNonExisting - startSetNonExisting
      ).toFixed(3)} ms`
    );

    // 존재하는 UUID
    expect(existsIncludes).toBe(true);
    expect(existsSet).toBe(true);
    expect(endIncludesExisting - startIncludesExisting).toBeGreaterThan(0);
    expect(endSetExisting - startSetExisting).toBeGreaterThan(0);

    // 존재하지 않는 UUID
    expect(existsIncludesNonExisting).toBe(false);
    expect(existsSetNonExisting).toBe(false);
    expect(endIncludesNonExisting - startIncludesNonExisting).toBeGreaterThan(
      0
    );
    expect(endSetNonExisting - startSetNonExisting).toBeGreaterThan(0);
  });
});
