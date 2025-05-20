import React, { useEffect, useState } from "react";
import { Table, Select, Tag, Row, Col, Spin } from "antd";
import { GET_TASKS_API, fetchWithAuth } from "../config/api";

const { Option } = Select;

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredStatus, setFilteredStatus] = useState(null);
// Thêm dòng này: danh sách thành viên mẫu
  const memberOptions = ["Alice", "Bob", "Charlie", "David"];

  useEffect(() => {
    const fetchTasks = async () => {
  try {
    setLoading(true);
    const response = await fetchWithAuth(GET_TASKS_API);
    if (!response.ok) {
      // Nếu lỗi 401 hoặc lỗi khác, xử lý tại đây
      setTasks([]); // hoặc hiển thị thông báo lỗi
      return;
    }
    const data = await response.json();
    setTasks(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    setTasks([]);
  } finally {
    setLoading(false);
  }
};

    fetchTasks();
  }, []);

  const handleMemberChange = (value, record) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === record._id) {
        return { ...task, assignedTo: value };
      }
      return task;
    });
    setTasks(updatedTasks);
    // Gọi API để cập nhật dữ liệu trên server tại đây
  };

  const handleStatusFilterChange = (value) => {
    setFilteredStatus(value);
  };

  const columns = [
    {
      title: "Task Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Member",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (text, record) => (
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Chọn thành viên"
          value={Array.isArray(record.assignedTo) ? record.assignedTo : [record.assignedTo]}
          onChange={(value) => handleMemberChange(value, record)}
        >
          {memberOptions.map((member) => (
            <Option key={member} value={member}>
              {member}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "in progress") {
          color = "orange";
        } else if (status === "done") {
          color = "green";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  const filteredTasks = filteredStatus
    ? tasks.filter((task) => task.status === filteredStatus)
    : tasks;

  return (
    <div>
      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={handleStatusFilterChange}
          >
            <Option value="all">Tất cả</Option>
            <Option value="todo">Chưa bắt đầu</Option>
            <Option value="in progress">Đang thực hiện</Option>
            <Option value="done">Đã hoàn thành</Option>
          </Select>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredTasks.map((task) => ({ ...task, key: task._id }))}
          loading={loading}
          rowKey="_id"
        />
      </Spin>
    </div>
  );
};

export default TaskTable;
