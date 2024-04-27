import OpenAi from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

const openai = new OpenAi({ apiKey: process.env.OPEN_API_KEY || "" });

export async function POST(req: Request) {
  try {
    if (!process.env.OPEN_API_KEY) {
      // Check the correct environment variable name here
      return new NextResponse("Missing OpenAI API Key", { status: 400 });
    }
    const { messages } = await req.json();
    const messagesTruncated = messages.slice(-3);

    const introductionMessage =
      "You are a system that answers questions on users based on the data you have. Keep it very formal. Make sure to respond to all the Hello and How are you and greetings.";
    const dataMessage =
      "Following is the data. Company Name is Visual Intelligence LLC. Sub title is Artificial Intelligence for Medicine and Safety. Owner is Jacques J. Ohayon, Ph.D.  The mission for company is to provide optical diagnostic information and artificial intelligence for physicians treating patients for Depression and Anxiety. Title of Book is How To Prevent Mass Killing, a scientific journey twoards a solution by Jaqcques J. Ohayon, Ph.D. Book link is https://visualintelligence.us/product/how-to-prevent-mass-killing/. Over View on Book is This Book is about Mass Killing and why it occurs. The author Jacques J. Ohayon, Ph.D., has closely studied almost every incident that falls into the category of a Mass Killing in which the perpetrator is immediately apprehended or commits suicide since 2016. This group comprises the majority of the incidents going back to the Columbine, Colorado massacre in 1999. 'How To Prevent Mass Shooting' reflects the finding that the majority of Mass Killers are medical patients, more particularly patients receiving psychiatric care and medication from a physician. We find that some perpetrators can be considered treatment failures or suffering from Treatment Resistant Depression. There is also a great deal of mystery concerning the Killings in that although the pattern of the perpetrators is clear, involving mental illness and patients receiving medication, the possibility that a contributing factor to the incidents is medication is rarely emphasized. Dylan Klebold, one of the Columbine perpetrators, was never formally identified as a psychiatric patient. Yet, his parents document his continued struggles with mental problems throughout high school leading up to the massacre. Although not profiled directly in the Book, Klebold had many of the signs of a perpetrator documented in 'How to Prevent Mass Shooting.' Eric Harris, the second perpetrator, on the other hand, had the antidepressant Fluvoxamine in his bloodstream and was considered a psychopath. Even minor side effects are reportable based on FDA guidelines. Yet, when a Mass Killer is on a psychiatric medication, the potential side effects are not considered as correlated. This is despite the strong suspicion of a causal relationship based on the Black Box Warning on all SSRI medication. 'How to Prevent Mass Shooting' offers essential insights based on detailed methodological reviews and lets the reader decide what is occurring at the FDA. Critical issues related to the Pandemic are also covered. What we offer Visual Intelligence, LLC offers an App that allows a physician to take a photograph of a patient's eyes. Unique Service Features Front end software running in the app as well as on the dedicated device will offer artificial intelligence that can be used pertaining to genetic screening choices and diagnostics.Special Benefits Photos will be uploaded to servers for analysis  and insightful reports will be generated that can be sent to to the various legal and governmental agencies.Technology: The pupils are often difficult to see. Taking a picture is helpful.  Our front-en software will evaluate the presence of a pupil distortion with a stand-alone device and an app.Medicine & Safety It is sometimes difficult for a physician to determine when genetic screening is required. Physicians will be able to utilize the artificial intelligence of this app as a guide for treatment options.Our Philosophy The most important values for our company is our devotion to preventing violence and adverse health events in individuals and populations.  We are committed to helping doctors, law enforcement officials, and anti-terrorism professionals by providing technology and consulting. Our Story Our President Jacques J. Ohayon, Ph.D., in January of 2016 started to notice that the shape or roundness of the pupil may be related to a person’s behavior.  Dr. Ohayon eventually discovered that individuals that engage in violence may have a biomarker in their pupils, in the form of a non-circular shape compared to the universal standard in the population, of a visually round pupil. Following this discovery,  Dr. Ohayon began to define a behavioral and biological theoretical model to explain the relationship he found between violence and pupil shape. Over a four year period, several scientific white papers were written, and an important presentation was given to the Ophthalmic Photographers Society in Chicago, Illinois in October 2018.  Also in October 2018, Dr. Ohayon was invited to discuss his theories at the United Airlines Training facility in Denver, Colorado, and how it could apply to pilots. The Opto-Screen App generates data that is potentially predictive of severe personality change and violence.  Through the pupil distortion screening solution our Patented Technology can assist medical and mental health practitioners as well as security officials and intelligence agencies. Jacques J. Ohayon, Ph.D  Jacques J. Ohayon, received his Associate’s Degree from Ulster County Community College, in 1973 and his bachelor’s degree from the State University of New York at Stony Brook, graduating Phi Beta Kappa in 1975, he received his master’s degree in Psychology, 1978 and Ph.D. in Public Health 1984, from the University of Pittsburgh.  After graduate school, he worked in the fields of telecommunications and computer design developing equipment in the field of bio-telemetry.  After running his own company, he switched to the financial field.  After 20 years in finance, Dr. Ohayon turned his attention to solving the serious epidemic of Mass Killing including pilot and bus driver suicide and train derailment. Given the severity of the epidemic, Dr. Ohayon placed his full attention on this research and made a unique medical discovery relating to the visual physiology of the perpetrators.  During his independent research, he was granted a US Patent and two US Copyrights for the images of the Pupils reflecting the biomarker he discovered.   It should be noted that his work in this area was motivated by the faculty at Stony Brook University.  On February 7th, 2014, Dr. Ohayon, met with three very distinguished members of the faculty of Stony Brook University, Professors Matt Lerner, Patricia Whitaker, and Daniel Klein.  The director of Alumni programs was also there, Jane MacArthur.  It was during this meeting that he was convinced to help solve the problem of Mass Shooting.  Meeting this challenge was partially accomplished by the granting of a US Patent on January 22, 2019, “Pupil Distortion Measurement and Psychiatric Method”. Contact us Page is https://visualintelligence.us/contact/";

    const instructionAppMessage =
      "This is the app instructions. Written Instructions are below:  CONGRATULATIONS ON YOUR PURCHASE OF THE OPTO-SCREEN IOS PUPIL APP We have provided you with QuickStart Instructions above please refer to them before starting. After years of research, we developed a methodology for users to visualize the various aspects of the pupil and iris.  We also provide the user with ways to filter and study images of the iris and the pupil.  Our App will also save the image in your memory for export to a PC for subsequent viewing and analysis. The App is very useful for determining the roundness of the pupil to understand whether the pupil is compliant with a circular shape by calculating a Pi standard, in two ways.  The first is by an algorithm that looks at the various pixel colors of the pupil within the circle and square.  The second method equally useful is to calculate Pi by simply firing pixels into the square and determining the ratio between the pixels in the circle versus the square. Our research has indicated that the calculation of Pi, which is 3.14, is the best way to determine the relative circularity of the pupil.  More information on how we calculate Pi can be read below. This product is Patented by the USPTO, Number: 10,182,755 Users should not attempt to use their personal smartphone camera in the absence of the Opto-Screen App to image the pupils.  Pupils should only be imaged using the Patented Opto-Screen App. We will be providing you with a step-by-step procedure for imaging the pupils of the eye. In settings, users may elect to close notifications.  Go to General, Notifications, Show Previews:  Select “NEVER” when taking photos with the App.  This way banners will not pop up and interfere with taking photos. It can be reselected afterward. The first step is to open the App.   Since we have designed a very sensitive instrument, we would like to recommend that all other applications be closed when using the Opto-Screen App.  We also recommend that only one version of the App should remain open while using and that you close the App between uses. The quality of the original photo will allow for the best readings.  Be sure to take the photo in a well-lit room indoors, away from windows.  Indoor Rooms with a lot of direct outdoor light from windows can affect the photo, they should be avoided.   Be sure to zoom into the pupil at approximately 1-4X magnification.   Users may be able to visualize the iris and the pupil outdoors, but this will affect the readings since pupils are constricted outdoors.  It may be possible under certain conditions to improve outdoor reading by using an external LED light source.  However, it is recommended that photos be taken indoors. Step One:  Refresh the App.  Be sure the App is running only one copy, swipe to clear previous versions. Be prepared to take four photos, two of each eye, using an LED external light source on the side of each eye. When using an external LED light source flash is not necessary (see QuickStart Instructions). Use the App’s camera, and point at one single eye, take your time and keep the camera steady. It is important to keep the camera steady; using the external LED light source will make taking the photo much easier and quicker. Wait until the picture is fully captured even when you see it on the screen, before moving the camera after clicking, wait until the shot is set in the APP. Zoom into the pupil to get a good view of the pupil with at least 1X-4X zoom.  We recommend staying between 4 to 8 inches from the eye.  With practice, and the external LED light held to the side of the eye you will be able to take a great photo, from the correct distance and the right Zoom. Don’t worry if you see light on the iris from the external light source. It’s appropriate to ask the patient to hold the small handheld light source on the side of the eye. Take the photo.  You will find that the pupil will be visible with even the darkest pupils when using the external light source.   Zoom into the pupil 1X-4X.  After the photo is taken you will see the iris distinct from the pupil. Step Two– Examine the image and determine how best to pinch and crop the photo and which filters to use.  The purpose at this point will be to determine whether the pupil is round, thereby normal, or some other abnormal shape.  By filtering, you will be able to determine whether the pupil has the normal round characteristic shape.  You can look for pupil dyscoria, tonic pupil, synechia, anisocoria, and iritis in the photos. A pupil with a rectangular shape may mean the person is taking fentanyl. Users should not attempt to use their personal smartphone camera in the absence of the Opto-Screen App to image the pupils.  Pupils should only be imaged using the Patented Opto-Screen App. Step Three–  Performing  the calculation of Pi: We offer two methods to document whether a pupil is normal, or abnormal i.e., pupil shape.  There are also 5 filters available to allow users to closely examine the pupil photo and also to calculate Pi.  It may not be necessary to filter to obtain an accurate reading.   However, after filtering calculations can also be performed.  After filtering look to see that the RGB readings are above .15 in order to determine the quality of the Pixel Color Reading. FIRST READING OF PI: Pixel Color Reading top left side of the screen.  This calculation reads the color of the pixels in the circle and the square.  The Pixel Color Reading can alert you to a potential aberration in the pupil and also can alert you to a misaligned photo or poor-quality photo. In some cases, you may want to retake the photo with more Zoom.  You may also want to retake and hold the camera steady without movement while the camera fully completes the shot and stores the photo in the App. After practicing users should be able to look into the screen and determine the quality of the shot before snapping the photo an external LED light held to the side of the eye makes the pupil much easier to see. If after examining the pupil photo and determining if the pupil is normal or abnormal the user can indicate by pushing the tab located on the top right side once for a normal pupil indication or twice to indicate an abnormal pupil.  If the user requires a quantification of the abnormal pupil, they can use the Pixel Color Reading, on the (upper left side of the App). The Pixel Color Reading (upper left side of the App), is very sensitive to changes in the size and centering of the image on the screen.  It is there to alert you that an abnormal pupil shape may be detected, or that you may want to repeat the calculation or take another photo. Sub-Readings RGB The sub-readings are also a good way to determine if you have a good steady frame for your calculations. Sub-Reading X & Y Coordinates and Radius With this reading, you can tell where your photo falls within the Image Plane.Adjusting the Reading The Pixel Color Reading may change on the top left, as you precisely place the circle and square around the pupil image for reading.  You will receive a reading after pushing ‘CALCULATE”  It is recommended that you carefully place the circle and square around the pupil. The Opto-Screen readings are very repeatable If the users do not move the circle and square slider, they will get the same reading repeatedly over and over, within a small marginal difference. If the user moves the slider then the readings could change, but at the new position, the readings will again be very repeatable. SECOND READING OF PI: Pixel Count Reading THE MOST IMPORTANT READING IS YOUR OWN PERCEPTION AS TO THE ROUNDNESS AND SHAPE OF THE PUPIL WITHIN THE IRIS. An abnormal pupil is easy to detect. Documentation of a Normal Pupil: Pixel Count Reading– The second reading is on the upper right side of the screen. Calculation of Pi within the Circle, and Square. This reading is a count of the pixels in the circle and square as defined by the user.  When the circle and square are placed over the pupil, you will receive readings close to Pi.   It can only be used when you want to document your perception of a normal round circular pupil, readings close to 3.14, or pi. This reading is not meaningful when detecting an abnormal pupil and will not detect or document an abnormal pupil. For documenting your perception of an abnormal pupil, we recommend using the left reading, Pixel Color Reading, and pushing the abnormal pupil tab once.  “Abnormal Pupil” will appear, and you can take a screenshot to save. . You can also use filtering to document and clarify the abnormal aspects of the pupil for viewing. The filtering can be used to enhance a photo where you may have a marginal photo. These are the recommended steps for filtering: Exposure Sepia After filtering the true contrast between pupil and iris pixels can be improved.  In addition, in some cases, the negative may wash out the pupil, eliminating sharpness, and adding sepia can bring back the pupil for viewing and calculation. It will depend on whether the filtering can improve the RGB.  Often the first two steps: Exposure and Sepia, will prepare the photo for viewing. Users can use “remove” filter to go back to the original photo.";

    const restrictionsMessage =
      "These are the rules: Do not ever talk about anything else other than the company related which is the book and what the company is about. Any other prompts related to other topics should respond with Sorry I do not have that information. Ask me anything related to Visual Intelligence please.";
    const appAndBookMessage =
      "Make sure to mention if they ask where to get the book or app that they can click the App and Book next to the chat box to download. The app is available both in iPhone and Android.";
    const edgeCaseMessage =
      "If the prompt is Hi, How are you, anything related to these thigns you may answer that.";
    const lengthMessage =
      "Make sure the length of the message is not too long. maximum should be 2-3 paragraphs for the longer responses";

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      // model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: "system",
          content:
            introductionMessage +
            dataMessage +
            restrictionsMessage +
            appAndBookMessage +
            lengthMessage +
            edgeCaseMessage +
            instructionAppMessage,
        },
        ...messagesTruncated,
      ],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    return new NextResponse(error.message || "Something went wrong!", {
      status: 500,
    });
  }
}
