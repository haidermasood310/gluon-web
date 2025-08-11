import { api } from "@/config/axios";

export const generateOptions = async (
  params: string,
): Promise<{
  Email_Subject_Line: string[];
  Email_Introduction_Line: string[];
  Email_Body_Text: string[];
  Call_To_Actions: string[];
}> => {
  try {
    const response = await api.get(`/Generate_AI_text?${params}`);
    return response.data;
  } catch (error) {
    console.error("Err Generate_AI_text:", error);
    throw error;
  }
};

export const generateEmailDesign = async (params: string): Promise<string> => {
  try {
    const response = await api.get(`/Generate_Design?${params}`);
    return response.data;
  } catch (error) {
    console.error("Err generateEmailDesign:", error);
    throw error;
  }
};
