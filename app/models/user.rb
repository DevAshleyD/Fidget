class User < ApplicationRecord
    validates :username, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}
    # validates_email_format_of :email, :message => 'Please enter a valid email'

    attr_reader :password
    after_initialize :ensure_session_token

    has_one :channel,
        foreign_key: :owner_id,
        class_name: :Channel,
        dependent: :destroy


    def self.find_by_credentials(username, password) 
        queryResult = []
        user = User.find_by(username: username)
        # return nil if user.nil?
        
        queryResult.push(user)
        return queryResult.push({usernameError: "This username does not exist"}) if user.nil?

        user.verify_password(password) ? queryResult : [nil, { passwordError: "That password was incorrect. Please try again."}]

    end


    def verify_password(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end



    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end


    def reset_session_token!
        self.session_token = SecureRandom.base64(64)
        self.save
        self.session_token
    end


    private

    def ensure_session_token
        self.session_token ||= SecureRandom.base64(64)
    end

end
