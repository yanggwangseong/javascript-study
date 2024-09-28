import { generateUUIDs } from "./generate-uuid";
import { performance } from "perf_hooks";

export const testPerformance = () => {
  const count = 1000000; // 100만개
  console.log(`${count}개의 고유한 UUID를 생성합니다...`);
  const memberIds = generateUUIDs(count);
  console.log("UUID 생성 완료.");

  console.log("Set을 생성합니다...");
  const memberSet = new Set(memberIds);
  console.log("Set 생성 완료.");

  const existingUUID = memberIds[Math.floor(Math.random() * count)]!;
  const nonExistingUUID = generateUUIDs(1)[0]!;

  // Checking existence with Array.includes
  console.log("Array.includes로 존재하는 UUID 확인...");
  let start = performance.now();
  let exists = memberIds.includes(existingUUID);
  let end = performance.now();
  console.log(
    `Array.includes(existingUUID): ${exists}, 소요 시간: ${(
      end - start
    ).toFixed(3)} ms`
  );

  // Checking existence with Set.has
  console.log("Set.has로 존재하는 UUID 확인...");
  start = performance.now();
  exists = memberSet.has(existingUUID);
  end = performance.now();
  console.log(
    `Set.has(existingUUID): ${exists}, 소요 시간: ${(end - start).toFixed(
      3
    )} ms`
  );

  // Checking non-existing UUID with Array.includes
  console.log("Array.includes로 존재하지 않는 UUID 확인...");
  start = performance.now();
  exists = memberIds.includes(nonExistingUUID);
  end = performance.now();
  console.log(
    `Array.includes(nonExistingUUID): ${exists}, 소요 시간: ${(
      end - start
    ).toFixed(3)} ms`
  );

  // Checking non-existing UUID with Set.has
  console.log("Set.has로 존재하지 않는 UUID 확인...");
  start = performance.now();
  exists = memberSet.has(nonExistingUUID);
  end = performance.now();
  console.log(
    `Set.has(nonExistingUUID): ${exists}, 소요 시간: ${(end - start).toFixed(
      3
    )} ms`
  );
};
