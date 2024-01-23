import NotFound from "@/components/styledComponents/NotFound";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Layout } from "antd";
import { JSXElementConstructor, ReactElement, Suspense } from "react";

const CanvasSettings = ({
  children,
}: {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactElement<any, string | JSXElementConstructor<any>>[];
}) => {
  return (
    <Layout.Content>
      <Suspense fallback={<NotFound />}>
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
