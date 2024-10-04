import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppRoot,
  FixedLayout,
  Text,
  TabsList,
  Avatar,
  Button,
  Modal,
} from "@telegram-apps/telegram-ui";


// Helper function for date formatting
const getFormattedDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
};

// Main component
const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"active" | "archive" | "all">(
    "active"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Sample PDF URL for testing
  const samplePdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"; // Replace with your PDF

  const handleBack = () => {
    navigate("/documents");
  };

  const handleTabClick = (tab: "active" | "archive" | "all") => {
    setSelectedTab(tab);
  };

  const handleContractClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppRoot>
      <FixedLayout vertical="top" className="full-screen">
        <div className="outgoing-layout">
          <div className="header">
            <Button className="back-button" onClick={handleBack}>
              Arrow
            </Button>
            <Text className="header-text">Исходящие</Text>
          </div>
          <div className="tabs-section">
            <TabsList className="tabs-list">
              <TabsList.Item
                onClick={() => handleTabClick("active")}
                selected={selectedTab === "active"}
              >
                Активные
              </TabsList.Item>
              <TabsList.Item
                onClick={() => handleTabClick("archive")}
                selected={selectedTab === "archive"}
              >
                Архив
              </TabsList.Item>
              <TabsList.Item
                onClick={() => handleTabClick("all")}
                selected={selectedTab === "all"}
              >
                Все
              </TabsList.Item>
            </TabsList>
          </div>
          <div className="content">
            <div className="contracts-list">
              <div className="contract-item" onClick={handleContractClick}>
                <div className="first-side">
                  <Text Component="span">Дата окончания договора</Text>
                  <Text Component="p">{getFormattedDate(new Date())}</Text>
                </div>
                <div className="contract-detail">
                  <Text Component="span">Кто выполняет первый:</Text>
                  <div className="breadrumbs">
                    <div className="breadrumbs-item">
                      <div className="user-info">
                        <Avatar src="" size={28} />
                        <Text Component="span">Sample User</Text>
                      </div>
                    </div>
                    <div className="arrow">
                      Arrow
                    </div>
                    <div className="breadrumbs-item">
                      <Text>Вы</Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FixedLayout>

      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          className="tall-modal"
        >
          <div className="contract-modal-header">
            <Button className="close-button" onClick={closeModal}>
              Close
            </Button>
            <Text Component="h2" className="header-text">Договор</Text>
          </div>
          <div className="contract-preview">
            <iframe
              src={samplePdfUrl}  // Static PDF URL
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "calc(100vh - 160px)",
                border: "none",
                backgroundColor: "#f8f8f8",
                display: "block",
              }}
              title="PDF Preview"
              allowFullScreen
            ></iframe>
          </div>
        </Modal>
      )}
    </AppRoot>
  );
};

export default StartPage;
