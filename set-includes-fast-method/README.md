# 🚀 배열과 빠른 요소 탐색 탐구하기

`배열에서 특정 요소를 탐색시에 가장 빠른 방법은 무엇일까?`
배열에 요소에 특정 요소가 있는지 탐색할때 `indexOf` 나 `includes` 메서드를 사용하기에 시간복잡도가 `O(n)` 이기 때문에 너무 비효율적인 탐색이라는 생각이 들었다.
그래서 _중복되지 않는 데이터를 탐색할 때_ `set` 자료형을 이용하여 탐색하면 시간복잡도가 `O(1)` 이기 때문에 굉장히 빠를것 같았다. 더 나아가 그렇다면 `includes` 메서드와 `set` 자료형으로 탐색할때 얼마나 차이날지 테스트를 해보게 되었다.
성능 비교를 위해서 **TypeScript**와 **Node.js**를 사용하여 대용량 데이터셋에서 요소의 존재 여부를 확인할 때 `Array.includes`와 `Set.has`의 성능 차이를 비교 했습니다.

---

## 🧐 개요

배열에서 특정 요소를 탐색할 때 `indexOf`나 `includes` 메서드를 사용하면 시간 복잡도가 **O(n)**입니다. 이는 대용량 데이터셋에서 비효율적일 수 있습니다. 데이터가 **중복되지 않는 것이 보장**된다면, `Set` 자료형과 `has` 메서드를 사용하여 시간 복잡도를 **O(1)**로 줄일 수 있다.

- `Array.includes`와 `Set.has`의 성능 차이를 비교합니다.
- 대용량 데이터에서의 실제 성능 차이를 확인합니다.
- 요소 존재 여부 확인 시 `Set`을 사용해야 하는 상황을 파악합니다.

---

## 📋 목차

- [🔍 실험 상세 내용](#-실험-상세-내용)
- [💻 코드 예시](#-코드-예시)
- [📝 테스트 결과](#-테스트-결과)
- [📊 실험 결과](#-실험-결과)
- [⚠️ 주의사항](#️-주의사항)
- [📚 참고 자료](#-참고-자료)

---

## 🔍 실험 상세 내용

### 목적

대용량 데이터셋에서 `Array.includes`와 `Set.has`를 사용하여 요소의 존재 여부를 확인할 때의 성능을 비교합니다.

### 방법

- **데이터 생성**: `generateUUIDs` 함수를 사용하여 **1,000,000개의 고유 UUID**를 생성합니다.
- **데이터 구조**:
  - **배열**: UUID를 `memberIds` 배열에 저장합니다.
  - **Set**: UUID를 `memberSet`이라는 `Set`에 저장합니다.
- **테스트 케이스**:
  1. **존재하는 UUID**의 존재 여부 확인
  2. **존재하지 않는 UUID**의 존재 여부 확인

---

## 💻 코드 예시

### 성능 테스트 코드

```typescript
import { generateUUIDs } from "./generate-uuid";
import { performance } from "perf_hooks";

export const testPerformance = () => {
  const count = 1000000; // 1,000,000개
  console.log(`${count}개의 고유한 UUID를 생성합니다...`);
  const memberIds = generateUUIDs(count);
  console.log("UUID 생성 완료.");

  console.log("Set을 생성합니다...");
  const memberSet = new Set(memberIds);
  console.log("Set 생성 완료.");

  const existingUUID = memberIds[Math.floor(Math.random() * count)]!;
  const nonExistingUUID = generateUUIDs(1)[0]!;

  // Array.includes로 존재하는 UUID 확인
  console.log("Array.includes로 존재하는 UUID 확인...");
  let start = performance.now();
  let exists = memberIds.includes(existingUUID);
  let end = performance.now();
  console.log(
    `Array.includes(existingUUID): ${exists}, 소요 시간: ${(
      end - start
    ).toFixed(3)} ms`
  );

  // Set.has로 존재하는 UUID 확인
  console.log("Set.has로 존재하는 UUID 확인...");
  start = performance.now();
  exists = memberSet.has(existingUUID);
  end = performance.now();
  console.log(
    `Set.has(existingUUID): ${exists}, 소요 시간: ${(end - start).toFixed(
      3
    )} ms`
  );

  // Array.includes로 존재하지 않는 UUID 확인
  console.log("Array.includes로 존재하지 않는 UUID 확인...");
  start = performance.now();
  exists = memberIds.includes(nonExistingUUID);
  end = performance.now();
  console.log(
    `Array.includes(nonExistingUUID): ${exists}, 소요 시간: ${(
      end - start
    ).toFixed(3)} ms`
  );

  // Set.has로 존재하지 않는 UUID 확인
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
```

---

## 📝 테스트 결과

### 실행 출력 결과

```
1000000개의 고유한 UUID를 생성합니다...
UUID 생성 완료.
Set을 생성합니다...
Set 생성 완료.
Array.includes로 존재하는 UUID 확인...
Array.includes(existingUUID): true, 소요 시간: 11.688 ms
Set.has로 존재하는 UUID 확인...
Set.has(existingUUID): true, 소요 시간: 0.003 ms
Array.includes로 존재하지 않는 UUID 확인...
Array.includes(nonExistingUUID): false, 소요 시간: 74.544 ms
Set.has로 존재하지 않는 UUID 확인...
Set.has(nonExistingUUID): false, 소요 시간: 0.007 ms
```

### Jest 테스트 결과

```typescript
import { generateUUIDs } from "../src/generate-uuid";
import { performance } from "perf_hooks";

describe("Performance Test", () => {
  it("should compare includes and Set.has performance for existing and non-existing UUIDs", () => {
    const count = 1000000;
    const memberIds = generateUUIDs(count);
    const memberSet = new Set(memberIds);

    const existingUUID = memberIds[Math.floor(Math.random() * count)] as string;
    const nonExistingUUID = generateUUIDs(1)[0] as string;

    // 존재하는 UUID 테스트
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

    // 존재하지 않는 UUID 테스트
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

    // 검증
    expect(existsIncludes).toBe(true);
    expect(existsSet).toBe(true);
    expect(existsIncludesNonExisting).toBe(false);
    expect(existsSetNonExisting).toBe(false);
  });
});
```

#### Jest 출력 결과

```
> set-includes-fast-method@1.0.0 test
> jest

  console.log
    Array.includes(existingUUID): true, 소요 시간: 8.460 ms

      at Object.<anonymous> (src/performance-test.spec.ts:17:13)

  console.log
    Set.has(existingUUID): true, 소요 시간: 0.003 ms

      at Object.<anonymous> (src/performance-test.spec.ts:26:13)

  console.log
    Array.includes(nonExistingUUID): false, 소요 시간: 75.124 ms

      at Object.<anonymous> (src/performance-test.spec.ts:36:13)

  console.log
    Set.has(nonExistingUUID): false, 소요 시간: 0.012 ms

      at Object.<anonymous> (src/performance-test.spec.ts:45:13)

 PASS  src/performance-test.spec.ts
  Performance Test
    ✓ should compare includes and Set.has performance for existing and non-existing UUIDs (1342 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Time:        2.626 s, estimated 3 s
```

---

## 📊 실험 결과

### 존재하는 UUID 탐색

- **`Array.includes`**: 11.688 ms
- **`Set.has`**: 0.003 ms
- **`Set.has`가 `Array.includes`보다 약 3,896배 더 빠르다.**

### 존재하지 않는 UUID 탐색

- **`Array.includes`**: 74.544 ms
- **`Set.has`**: 0.007 ms
- **`Set.has`가 `Array.includes`보다 약 10,649배 더 빠르다.**

### 분석

- 배열의 `includes` 메서드는 선형 탐색을 수행하므로 데이터 양에 비례하여 시간이 증가한다.
- `Set`의 `has` 메서드는 해시 테이블을 기반으로 평균적으로 상수 시간(O(1))에 탐색이 가능하다.
- 데이터셋이 클수록 `Set`의 성능이 굉장히 좋다는것을 알 수 있다. 그래도 `Set` 자료형은 순서를 보장하지 않고 중복되지 않는 데이터를 저장하기 위해 사용되는 자료형이기 때문에 데이터의 중복성과 순서가 필요한 경우에는 적합하지 않다.

---

## 📚 참고 자료

- [ECMAScript 사양 - Set](https://tc39.es/ecma262/#sec-set.prototype.has)
- [ECMAScript 사양 - Array.includes](https://tc39.es/ecma262/#sec-array.prototype.includes)

---

## 📝 비고

- 내용을 정리하고 chatGPT를 통해서 정리한 자료 입니다.

---
