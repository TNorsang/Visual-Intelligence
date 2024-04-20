import OpenAi from 'openai';
import {OpenAIStream, StreamingTextResponse} from 'ai';
import {NextResponse} from 'next/server';

export const runtime = 'edge'

const openai = new OpenAi({ apiKey: process.env.OPEN_API_KEY || ''})

export async function POST(req: Request) {
    try{
        if(!process.env.OPEN_API_KEY) { // Check the correct environment variable name here
            return new NextResponse('Missing OpenAI API Key', {status: 400})
        }
        const {messages} = await req.json()
        const messagesTruncated = messages.slice(-10);

        const introductionMessage = "You are a system that answers questions on users based on the data you have."
        const dataMessage = "Following is the data. Company Name is Visual Intelligence LLC. Sub title is Artificial Intelligence for Medicine and Safety. Owner is Jacques J. Ohayon, Ph.D.  The mission for company is to provide optical diagnostic information and artificial intelligence for physicians treating patients for Depression and Anxiety. Title of Book is How To Prevent Mass Killing, a scientific journey twoards a solution by Jaqcques J. Ohayon, Ph.D. Book link is https://store.bookbaby.com/book/how-to-prevent-mass-shooting. Over View on Book is This Book is about Mass Killing and why it occurs. The author Jacques J. Ohayon, Ph.D., has closely studied almost every incident that falls into the category of a Mass Killing in which the perpetrator is immediately apprehended or commits suicide since 2016. This group comprises the majority of the incidents going back to the Columbine, Colorado massacre in 1999. 'How To Prevent Mass Shooting' reflects the finding that the majority of Mass Killers are medical patients, more particularly patients receiving psychiatric care and medication from a physician. We find that some perpetrators can be considered treatment failures or suffering from Treatment Resistant Depression. There is also a great deal of mystery concerning the Killings in that although the pattern of the perpetrators is clear, involving mental illness and patients receiving medication, the possibility that a contributing factor to the incidents is medication is rarely emphasized. Dylan Klebold, one of the Columbine perpetrators, was never formally identified as a psychiatric patient. Yet, his parents document his continued struggles with mental problems throughout high school leading up to the massacre. Although not profiled directly in the Book, Klebold had many of the signs of a perpetrator documented in 'How to Prevent Mass Shooting.' Eric Harris, the second perpetrator, on the other hand, had the antidepressant Fluvoxamine in his bloodstream and was considered a psychopath. Even minor side effects are reportable based on FDA guidelines. Yet, when a Mass Killer is on a psychiatric medication, the potential side effects are not considered as correlated. This is despite the strong suspicion of a causal relationship based on the Black Box Warning on all SSRI medication. 'How to Prevent Mass Shooting' offers essential insights based on detailed methodological reviews and lets the reader decide what is occurring at the FDA. Critical issues related to the Pandemic are also covered."
        const restrictionsMessage = "These are the rules: Do not ever talk about anything else other than the company related which is the book and what the company is about. Any other prompts related to other topics should respond with Sorry I do not have that information. Ask me anything related to Visual Intelligence please."
        const appMessage = "The app is located at the right side of this chatbox. User can click the pupil on the right side of this chatbox to download the app."
        const edgeCaseMessage = "If the prompt is How are you or anything related to these thigns you may answer that."
        const lengthMessage = "Make sure the length of the message is not too long."


        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            stream: true,
            messages: [{role: "system", content: introductionMessage + dataMessage + restrictionsMessage + appMessage + lengthMessage + edgeCaseMessage}, ...messagesTruncated]
        })

        const stream = OpenAIStream(response)
        return new StreamingTextResponse(stream)
    } catch (error:any){
        return new NextResponse(error.message || 'Something went wrong!', {status: 500})
    }
}
