import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '@pages/LoginPage'
import MyProfile from '@pages/MyProfile'
import PageContainer from '@components/PageContainer'
import HomePage from '@pages/HomePage'
import MyDocumentPage from '@pages/MyDocumentPage'
import Folder from '@pages/Folder'
import Error from '@pages/Error'
import OTPVerify from './components/OTPVerify'
import FamilyPage from '@pages/FamilyPage'
import Test from '@pages/Test'
import SearchPage from '@pages/SearchPage'
import EditDocumentForm from '@components/EditDocumentForm'
import File from '@pages/File'
import FormPage from '@pages/FormPage'
import AllDocumentPage from '@pages/AllDocumentPage'

const AppRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/mydocument"
            element={
              <>
                <PageContainer breadcrumb>
                  <MyDocumentPage />
                </PageContainer>
              </>
            }
          />
          <Route
            path="/alldocument/:category"
            element={
              <>
                <PageContainer breadcrumb>
                  <AllDocumentPage />
                </PageContainer>
              </>
            }
          />

          <Route
            path="/home"
            element={
              <>
                <PageContainer breadcrumb>
                  <HomePage />
                </PageContainer>
              </>
            }
          />
          <Route path="/info" element={<h1>info</h1>} />
          <Route
            path="/myprofile"
            element={
              <>
                <PageContainer>
                  <MyProfile />
                </PageContainer>
              </>
            }
          />
          {/* <Route
            path="/otpverify"
            element={
              <>
                <PageContainer>
                  <OTPVerify />
                </PageContainer>
              </>
            }
          /> */}
          <Route
            path="/folder/:id"
            element={
              <>
                <PageContainer>
                  <Folder />
                </PageContainer>
              </>
            }
          />

          {/**
           *  use type to determine which type of File to render
           * type = 1 => generatedFile
           * type = 2 => uploadedFile
           * type = 3 => userFreeUploadFile
           */}
          <Route
            path="/file/:type/:id"
            element={
              <>
                <PageContainer>
                  <File />
                </PageContainer>
              </>
            }
          />

          <Route
            path="/family"
            element={
              <>
                <PageContainer>
                  <FamilyPage />
                </PageContainer>
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <PageContainer>
                  <SearchPage />
                </PageContainer>
              </>
            }
          />
          <Route
            // path="/folder/:id/form"
            path="/form"
            element={
              <>
                <PageContainer>
                  <FormPage />
                </PageContainer>
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <PageContainer>
                  <Error />
                </PageContainer>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoute
