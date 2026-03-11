// data.js
const toeicTestCenters = [
  {
    id: 1,
    name: "서울대학교 공과대학 시험장",
    city: "서울",
    district: "관악구",
    address: "서울특별시 관악구 관악로 1",
    lat: 37.459882,
    lng: 126.951905,

    transport: {
      subway: [
        {
          line: "2호선",
          station: "서울대입구역",
          exit: "3번 출구",
          time: "버스 10분"
        }
      ],
      bus: ["5511", "5513", "5515"]
    },

    facilities: {
      parking: true,
      cafeteria: true,
      convenienceStore: true,
      restroom: true
    },

    examInfo: {
      seats: 300,
      building: "301동",
      floor: "1~3층",
      note: "입실 마감 09:20"
    },

    examSchedule: [
      {
        date: "2026-04-26",
        startTime: "10:20",
        type: "정기 토익"
      },
      {
        date: "2026-05-10",
        startTime: "10:20",
        type: "정기 토익"
      }
    ]
  },

  {
    id: 2,
    name: "연세대학교 공학관 시험장",
    city: "서울",
    district: "서대문구",
    address: "서울특별시 서대문구 연세로 50",
    lat: 37.565784,
    lng: 126.938572,

    transport: {
      subway: [
        {
          line: "2호선",
          station: "신촌역",
          exit: "2번 출구",
          time: "도보 10분"
        }
      ],
      bus: ["163", "171", "172", "270"]
    },

    facilities: {
      parking: false,
      cafeteria: true,
      convenienceStore: true,
      restroom: true
    },

    examInfo: {
      seats: 250,
      building: "공학관 A동",
      floor: "2~4층",
      note: "입실 마감 09:20"
    },

    examSchedule: [
      {
        date: "2026-04-26",
        startTime: "10:20",
        type: "정기 토익"
      }
    ]
  },

  {
    id: 3,
    name: "고려대학교 자연계캠퍼스 시험장",
    city: "서울",
    district: "성북구",
    address: "서울특별시 성북구 안암로 145",
    lat: 37.589386,
    lng: 127.032397,

    transport: {
      subway: [
        {
          line: "6호선",
          station: "안암역",
          exit: "2번 출구",
          time: "도보 5분"
        }
      ],
      bus: ["273", "7211"]
    },

    facilities: {
      parking: true,
      cafeteria: true,
      convenienceStore: false,
      restroom: true
    },

    examInfo: {
      seats: 200,
      building: "과학도서관",
      floor: "1~2층",
      note: "입실 마감 09:20"
    },

    examSchedule: [
      {
        date: "2026-05-10",
        startTime: "10:20",
        type: "정기 토익"
      }
    ]
  },

  {
    id: 4,
    name: "부산대학교 제1공학관 시험장",
    city: "부산",
    district: "금정구",
    address: "부산광역시 금정구 부산대학로 63",
    lat: 35.233185,
    lng: 129.079639,

    transport: {
      subway: [
        {
          line: "1호선",
          station: "부산대역",
          exit: "3번 출구",
          time: "도보 8분"
        }
      ],
      bus: ["80", "131", "148"]
    },

    facilities: {
      parking: true,
      cafeteria: true,
      convenienceStore: true,
      restroom: true
    },

    examInfo: {
      seats: 350,
      building: "제1공학관",
      floor: "1~4층",
      note: "입실 마감 09:20"
    },

    examSchedule: [
      {
        date: "2026-04-26",
        startTime: "10:20",
        type: "정기 토익"
      }
    ]
  }
];