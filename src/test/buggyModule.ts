/**
 * 이 모듈은 의도적으로 여러 종류의 런타임 에러를 발생시킵니다.
 * GitHub Actions에서 실행 시 에러 추적 테스트용
 */

interface UserData {
    id: number;
    name: string;
    email: string;
}

class DataProcessor {
    private data: UserData[] = [];

    // 에러 1: Null Reference Error
    processUser(userId: number): string {
        const user = this.data.find(u => u.id === userId);
        // user가 undefined일 수 있는데 체크 없이 접근
        return user!.email.toUpperCase(); // 💥 런타임 에러 발생!
    }

    // 에러 2: Array Index Out of Bounds
    getFirstUser(): UserData {
        return this.data[0]; // 💥 배열이 비어있으면 undefined 반환
    }

    // 에러 3: Type Coercion Error
    calculateTotal(values: any[]): number {
        return values.reduce((sum, val) => {
            // 타입 체크 없이 숫자 연산
            return sum + val.amount; // 💥 val.amount가 없으면 에러
        }, 0);
    }

    // 에러 4: Async Error without proper handling
    async fetchData(url: string): Promise<void> {
        const response = await fetch(url); // 💥 Node.js에는 기본 fetch가 없을 수 있음
        const data = await response.json();
        this.data = data;
    }
}

// 에러 5: Division by Zero
function divide(a: number, b: number): number {
    return a / b; // JavaScript는 Infinity 반환하지만, 의도치 않은 결과
}

// 에러 6: JSON Parse Error
function parseConfig(jsonString: string): object {
    return JSON.parse(jsonString); // 💥 잘못된 JSON 문자열이면 에러
}

// 에러 7: Infinite Loop (의도적으로 주석 처리)
// function infiniteLoop() {
//     while (true) {
//         console.log("This will never end...");
//     }
// }

// 메인 실행 함수
export function runBuggyCode(): void {
    console.log("🚀 Starting buggy code execution...\n");

    try {
        console.log("Test 1: Processing non-existent user...");
        const processor = new DataProcessor();
        const email = processor.processUser(999); // 💥 에러 발생!
        console.log("Email:", email);
    } catch (error) {
        console.error("❌ Error in Test 1:", error);
        throw error; // 에러를 다시 throw하여 프로세스 종료
    }

    console.log("Test 2: Getting first user from empty array...");
    const processor2 = new DataProcessor();
    const user = processor2.getFirstUser(); // 💥 undefined
    console.log("User name:", user.name); // 💥 에러 발생!

    console.log("Test 3: Invalid JSON parsing...");
    const config = parseConfig("{ invalid json }"); // 💥 에러 발생!
    console.log("Config:", config);

    console.log("✅ All tests completed!");
}

// 직접 실행 시
if (require.main === module) {
    runBuggyCode();
}
