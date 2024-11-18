import fs from 'fs';
import path from 'path';

// ฟังก์ชันสำหรับ merge JSON files
const mergeJsonFiles = () => {
  try {
    console.log('🔄 Starting JSON merging...');

    // ระบุโฟลเดอร์ที่เก็บไฟล์ JSON
    const dataDir = path.join(process.cwd(), 'data');
    const fileNames = ['user_accounts.json', 'user_info.json', 'user_transfer.json'];

    // อ่านและตรวจสอบไฟล์ JSON
    const datasets = fileNames.map((fileName) => {
      const filePath = path.join(dataDir, fileName);

      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsedData = JSON.parse(fileContent);

      if (!parsedData.data || typeof parsedData.data !== 'object') {
        throw new Error(`Invalid JSON structure in file: ${filePath}`);
      }

      console.log(`Loaded: ${fileName}`);
      return parsedData.data; // คืนค่าข้อมูลใน key "data"
    });

    // ฟังก์ชันสำหรับ merge ข้อมูล
    const mergeData = (...dataArrays) => {
      const merged = {};
      dataArrays.forEach((dataset) => {
        Object.entries(dataset).forEach(([id, fields]) => {
          if (!merged[id]) {
            merged[id] = {};
          }
          // รวม fields ของ id เดียวกัน
          merged[id] = { ...merged[id], ...fields };
        });
      });
      return { data: merged };
    };

    // รวมข้อมูลจากไฟล์ทั้งหมด
    const mergedData = mergeData(...datasets);

    // บันทึกไฟล์ที่รวมแล้ว
    const outputFilePath = path.join(dataDir, 'merged_data.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(mergedData, null, 2), 'utf-8');

    console.log('Merged data successfully written to:', outputFilePath);
    return mergedData;
  } catch (error) {
    console.error('Error during merging:', error.message);
    process.exit(1); // ออกจากโปรแกรมพร้อมสถานะ error
  }
};

// เรียกใช้งานฟังก์ชัน
mergeJsonFiles();
