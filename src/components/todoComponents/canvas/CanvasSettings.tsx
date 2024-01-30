import LoadingPage from "@/components/styledComponents/LoadingPage";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Layout } from "antd";
import { JSXElementConstructor, ReactElement, Suspense } from "react";

const CanvasSettings = ({
  children,
  contextHolder,
}: {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactElement<any, string | JSXElementConstructor<any>>[];
  contextHolder?: ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
  return (
    <Layout.Content>
      {contextHolder}
      <Suspense fallback={<LoadingPage />}>
        <Canvas shadows>
          <Environment preset="dawn" />
          <directionalLight intensity={1} castShadow />
          {children}
        </Canvas>
      </Suspense>
    </Layout.Content>
  );
};

export default CanvasSettings;
